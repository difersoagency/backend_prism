"use client"

import { Button } from '@/components/ui/button';
import { ActionResult } from '@/types';
import { Trash } from 'lucide-react';
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteBrand } from '../lib/action';

const initialState: ActionResult = {
    error:''
}

interface DeleteBandProps{
    id:number
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

export default function FormDelete({id}: DeleteBandProps) {

    const deleteBrandWithId = (_:unknown, formData: FormData) => deleteBrand(_,formData,id)

    const [state, formAction] = useFormState(deleteBrandWithId,initialState);

  return (
    <form action={formAction} className='inline'>
        <SubmitButton/>
    </form>
  )
}
