"use server"

import { schemaUser } from "@/lib/schema";
import { ActionResult } from "@/types";
import { error } from "console";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { RoleUser } from "@prisma/client";


export async function postUser(
    _:unknown,
    formData: FormData,
): Promise<ActionResult>{
    const validate = schemaUser.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role')
    })

    if(!validate.success) {
        return{
            error:validate.error.errors[0].message
        }
    }

    try {
        await prisma.user.create({
            data: {
                name: validate.data.name,
                email: validate.data.email,
                password: validate.data.password,
                role: validate.data.role as RoleUser,
            }
        })
    } catch (error) {
        console.log(error)

        return{
            error: 'Gagal Tambah User'
        }
    }

    return redirect('/dashboard/users')
}

export async function deleteUser(
    _:unknown,
    formData: FormData,
    id:number
): Promise<ActionResult>{
    try {
        await prisma.user.delete({
            where:{
                id
            }
        })
    } catch (error) {
        console.log(error)

        return {
            error:'Data Gagal di Hapus'
        }
    }

    return redirect('/dashboard/users')
}