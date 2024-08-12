"use client"
import { Button } from '@/components/ui/button';
import { ActionResult } from '@/types';
import { Trash } from 'lucide-react';
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteUser } from '../lib/action';

interface DeleteUserProps {
    id: number
}

const initialState: ActionResult = {
    error:''
}

function SubmitButton(){
    const {pending} = useFormStatus();

    return(
        <Button size='sm' variant='destructive' disabled={pending}>
            <Trash className="w-4 h-4"/>
            {pending ? "Loading...." : "Delete"}
        </Button>
    )
}

export default function FormDelete({id} : DeleteUserProps) {

    const deleteUserWithId = (_:unknown, formData:FormData) => deleteUser(_,formData,id)

    const [state, formAction] = useFormState(deleteUserWithId, initialState)
  return (
    <form action={formAction} className='inline'>
        <SubmitButton/>
    </form>
  )
}
