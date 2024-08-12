"use client"

import { Button } from '@/components/ui/button'
import { ActionResult } from '@/types'
import { error } from 'console'
import { Trash } from 'lucide-react'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteLocation } from '../lib/action'
import { unknown } from 'zod'

const initialState: ActionResult = {
    error: ''
}

interface DeleteLocationProps{
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

export default function FormDelete({id} : DeleteLocationProps) {

    const deleteLocationWithId = (_:unknown, formData:FormData) => deleteLocation(_,formData, id)

    const [state, formAction] = useFormState(deleteLocationWithId, initialState)

  return (
    <form action={formAction} className='inline'>
        <SubmitButton/>
    </form>
  )
}
