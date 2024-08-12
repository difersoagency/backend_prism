"use server"

import { schemaBrand } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { Logout } from "../../lib/action";
import { uploadFile } from "@/lib/supabase";

export default async function postBrand(
    _:unknown,
    formData: FormData
): Promise<ActionResult> {
    // console.log(formData.get('name'))

    const validate = schemaBrand.safeParse({
        name: formData.get('name'),
        image: formData.get('image')
    })

    if(!validate.success){
        return {
            error: validate.error.errors[0].message
        }
    }

    try {
        const fileName = await uploadFile(validate.data.image, 'brands')
        await prisma.brand.create({
            data: {
                name: validate.data.name,
                logo: fileName
            }
        })
    } catch (error) {
        console.log(error);

        return {
            error: 'Gagal Upload Data'
        }
    }

    return redirect('/dashboard/brands');
}

export  async function updateBrand(
    _:unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult>{

    const validate = schemaBrand.safeParse({
        name:formData.get('name'),
        image:formData.get('image')
    })

    if(!validate.success){
        return {
            error:validate.error.errors[0].message
        }
    }

    if (id === undefined){
        return {
            error: 'ID is Undefine'
        }
    }

    try {
        const fileName = await uploadFile(validate.data.image, 'brands')
        await prisma.brand.update({
            where: {
                id:id
            },
             data: {
                name: validate.data.name,
                logo: fileName
             }
        })
    } catch (error) {
        console.log(error)

        return {
            error: 'Failed to Update Data'
        }
    }

    return redirect('/dashboard/brands');
}

export async function deleteBrand(
    _:unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {

    try {
        await prisma.brand.delete({
            where: {
                id
            }
        })
    } catch (error) {
        console.log(error)

        return {
            error: 'Data Gagal di Hapus'
        }
    }

    return redirect('/dashboard/brands')
}