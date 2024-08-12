"use server"

import { schemaLocation } from "@/lib/schema";
import { ActionResult } from "@/types"
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postLocation(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {
    // console.log(formData.get('name'));

    const validate = schemaLocation.safeParse({
        name: formData.get('name')
    })

    if(!validate.success) {
        return {
            error: validate.error.errors[0].message
        }
    }

    try{
        await prisma.location.create({
            data: {
                name: validate.data.name
            }
        })
    } catch (error) {
        console.log(error);
        return redirect('/dashboard/location/create')
    }

    return redirect('/dashboard/location')
}


export async function updateLocation(
    _:unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult>{
    // console.log(id)

    const validate = schemaLocation.safeParse({
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
        await prisma.location.update({
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

    return redirect('/dashboard/location')
}

export async function deleteLocation(
    _: unknown,
    formData: FormData,
    id: number
) : Promise<ActionResult>{
    

    try {
        await prisma.location.delete({
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

    return redirect('/dashboard/location');
}