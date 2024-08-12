"use server"

import { schemaLogin } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt'
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import prisma from "../../../../../lib/prisma";


export async function CustLogin(
    _: unknown,
    formData: FormData,
): Promise<ActionResult> {

    const validate = schemaLogin.safeParse({
        email: formData.get('email'),
        password: formData.get('password'), 
    })

    if(!validate.success){
        return {
            
            error: validate.error.errors[0].message
        }
    }

    const existinUser = await prisma.user.findFirst({
        where: {
            email: validate.data.email,
            role : 'superadmin'
        }
    })

    if (!existinUser){
        return {
            error: 'Email tidak Terdaftar   '
        }
    }

    const comparePass = bcrypt.compareSync(validate.data.password, existinUser.password)

    if (!comparePass) {
        return {
            error: 'Password Incorrect'
        }
    }

    const session = await lucia.createSession(existinUser.id, {})
    const sessionCookies = lucia.createSessionCookie(session.id)

    cookies().set(
        sessionCookies.name,
        sessionCookies.value,
        sessionCookies.attributes
    )


    return redirect('/dashboard')
}