"use server"

import { schemaCategory } from "@/lib/schema";
import { ActionResult } from "@/types"
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postCategory(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    // console.log(formData.get('name'));

    const validate = schemaCategory.safeParse({
        name: formData.get('name')
    })

    if(!validate.success) {
        return {
            error: validate.error.errors[0].message
        }
    }

    try{
        await prisma.category.create({
            data: {
                name: validate.data.name
            }
        })
    } catch (error) {
        console.log(error);
        return redirect('/dashboard/categories/create')
    }

    return redirect('/dashboard/categories')
}


export async function updateCategory(
    _:unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult>{
    // console.log(id)

    const validate = schemaCategory.safeParse({
        name : formData.get('name')
    })

    if(!validate.success) {
        return {
            error: validate.error.errors[0].message
        }
    }

    if(id === undefined ){
        return {
            error: 'ID is undefind'
        }
    } 

    try {
        await prisma.category.update({
            where: {
                id:id
            },
            data: {
                name: validate.data.name
            }
        })
    } catch (error) {
        console.log(error)

        return {
            error: "Failed to Update Data"
        }
    }

    return redirect('/dashboard/categories')
}

export async function deleteCategory(
    _: unknown,
    formData: FormData,
    id: number
) : Promise<ActionResult>{
    

    try {
        await prisma.category.delete({
            where: {
                id
            }, 
        })
    } catch (error) {
        console.log(error)

        return {
            error: 'Data Gagal di Hapus'
        }
    }

    return redirect('/dashboard/categories');
}
