"use server"

import { schemaProduct, schemaProductEdit } from "@/lib/schema";
import { uploadFile } from "@/lib/supabase";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { number } from "zod";
import { StockProduct } from "@prisma/client";

export async function postProduct(
    _:unknown,
    formData: FormData
): Promise<ActionResult>{
    // console.log({
    //     name: formData.get('name'),
    //     description: formData.get('description'),
    //     price: formData.get('price'),
    //     category_id: formData.get('category'),
    //     brand_id: formData.get('brand'),
    //     location_id: formData.get('location'),
    //     stock: formData.get('stock'),
    //     images: formData.getAll('images'),
    // });

    

    const validate = schemaProduct.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        category_id: formData.get('category'),
        brand_id: formData.get('brand'),
        location_id: formData.get('location'),
        stock: formData.get('stock'),
        images: formData.getAll('images'),
    })

    if(!validate.success){
        return{
            error: validate.error.errors[0].message
        }
    }

    const product_image = validate.data.images as File[]
    const fileNames = []

    for(const image of product_image) {
        const fileName = await uploadFile(image, 'product')
        fileNames.push(fileName)
    }

    try {
        await prisma.product.create({
            data:{
                name:validate.data.name,
                image: fileNames,
                description: validate.data.description,
                category_id: Number.parseInt(validate.data.category_id),
                brand_id: Number.parseInt(validate.data.brand_id),
                location_id: Number.parseInt(validate.data.location_id),
                price: Number.parseInt(validate.data.price),
                stock: validate.data.stock as StockProduct,
            }
        })
    } catch (error) {
        console.log(error)

        return {
            error:`${error}`
        }
    }
    return redirect('/dashboard/products')
}

export async function updateProduct(
    _:unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult>{
    const validate = schemaProductEdit.safeParse({
        id: id,
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        category_id: formData.get('category'),
        brand_id: formData.get('brand'),
        location_id: formData.get('location'),
        stock: formData.get('stock'),
    })

    if(!validate.success){
        return {
            error: validate.error.errors[0].message
        }
    }

    const product = await prisma.product.findFirst({
        where: {
            id: id
        }
    })

    if(!product) {
        return{
            error: 'Produk tidak ditemukan'
        }
    }

    const uploaded_image = formData.getAll('images') as File[]

    let fileNames = []

    if(uploaded_image.length === 3){
        console.log(uploaded_image)

        const parseImage = schemaProduct.pick({images: true}).safeParse({
            images: uploaded_image
        })

        if(!parseImage.success) {
            return{
                error: 'Gagal Upload Gambar Produk'
            }
        }

        for(const image of uploaded_image){
            const filename = await uploadFile(image, 'product')
            fileNames.push(filename)
        }
    } else {
        fileNames = product.image;
    }

    try {
        await prisma.product.update({
            where: {
                id: id
            },
             data: {
                name:validate.data.name,
                image: fileNames,
                description: validate.data.description,
                category_id: Number.parseInt(validate.data.category_id),
                brand_id: Number.parseInt(validate.data.brand_id),
                location_id: Number.parseInt(validate.data.location_id),
                price: Number.parseInt(validate.data.price),
                stock: validate.data.stock as StockProduct,
             }
        })
    } catch(error) {
        console.log(error)

        return{
            error:'Gagal Update Produk'
        }
    }

    return redirect('/dashboard/products')
}


export async function deleteProduct(
    _:unknown,
    formData: FormData,
    id: number
): Promise<ActionResult>{
    try {
        await prisma.product.delete({
            where:{
                id
            }
        })
    } catch (error) {
        console.log(error)

        return {
            error: 'Data Gagal di Hapus'
        }
    }

    return redirect('/dashboard/products')
}