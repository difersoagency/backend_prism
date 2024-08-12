"use client"

import { Button } from '@/components/ui/button'
import { ActionResult } from '@/types'
import { error } from 'console'
import { Trash } from 'lucide-react'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteCategory } from '../lib/action'
import { unknown } from 'zod'

const initialState: ActionResult = {
    error: ''
}

interface DeleteCategoryProps{
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

export default function FormDelete({id} : DeleteCategoryProps) {

    const deleteCategoryWithId = (_:unknown, formData:FormData) => deleteCategory(_,formData, id)

    const [state, formAction] = useFormState(deleteCategoryWithId, initialState)

  return (
    <form action={formAction} className='inline'>
        <SubmitButton/>
    </form>
  )
}
