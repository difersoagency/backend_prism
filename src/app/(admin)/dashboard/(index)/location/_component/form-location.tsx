"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionResult } from '@/types'
import { ChevronLeft} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { postLocation, updateLocation } from '../lib/action'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Category } from '@prisma/client'

const initialState: ActionResult = {
  error:''
}

interface FormLocationProps {
  type?: 'ADD' | 'EDIT'
  data?: Category | null
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" disabled={pending}>{pending ? "Loading...." : "Save Location"}</Button>
  )
}

export default function FormLocation({data = null,type = 'ADD'}: FormLocationProps) {

  const updateLocationWithId = (_:unknown, formData: FormData) => updateLocation(_, formData, data?.id)

  const [state, formAction] = useFormState(type === "ADD" ? postLocation : updateLocationWithId , initialState)

  return (
    <><form action={formAction}>
      <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" className="h-7 w-7"  type='submit'>
        <Link href='/dashboard/location'>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Add New Location
      </h1>
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <SubmitButton/>
      </div>
    </div>
    <div className='mt-10'>
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>New Location Detail</CardTitle>
            <CardDescription>
              Add new location to your product
            </CardDescription>
          </CardHeader>
          <CardContent>
          {state.error !== "" && (
        <Alert variant="destructive" className='mb-6'>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {state.error}
        </AlertDescription>
      </Alert>
      )}
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Location Name</Label>
                <Input
                  id="name"
                  type="text"
                  className="w-full"
                  name='name'
                  defaultValue={data?.name}
                  />
              </div>
            </div>
          </CardContent>
        </Card>


        
      </div>
      </form></>
  )
}
