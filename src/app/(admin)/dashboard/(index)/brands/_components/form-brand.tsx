"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionResult } from '@/types'
import { ChevronLeft, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import postBrand, { updateBrand } from '../lib/action'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Brand } from '@prisma/client'
import { getImageUrl } from '@/lib/supabase'

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" disabled={pending}>{pending ? "Loading...." : "Save Brand"}</Button>
  )
}

const initialState: ActionResult = {
  error: ''
}

interface FormBrandProps {
  type?: 'ADD' | 'EDIT'
  data?: Brand | null
}


export default function FormBrand({data = null, type='ADD'} :FormBrandProps) {

  const updteBrandWithId = (_:unknown, formData: FormData) => updateBrand(_,formData, data?.id)

  const [state, formAction] = useFormState(type == 'ADD' ? postBrand : updteBrandWithId ,initialState);

  return (
    <form action={formAction}>
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"></div>
      <div className="flex items-center gap-4">
      <Button variant="outline" size="icon" className="h-7 w-7"  type='submit'>
        <Link href='/dashboard/brands'>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        {type === 'ADD' ? 'Add New Brand ' : 'Update Existing Brand'}
      </h1>
      <div className="hidden items-center gap-2 md:ml-auto md:flex">
        <SubmitButton/>
      </div>
    </div>
    <div className='mt-10'>
        <Card x-chunk="dashboard-07-chunk-0">
          <CardHeader>
            <CardTitle>New Brands Detail</CardTitle>
            <CardDescription>
              Add new brand to your product
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
                <Label htmlFor="name">New Brand Name</Label>
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

        <Card
                  className="overflow-hidden mt-5" x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Brand Logo</CardTitle>
                    <CardDescription>
                      Upload your brand logo here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {type === 'EDIT' ? <div>
                            <Image
                        src={getImageUrl(data?.logo, 'brands')}
                        width={40}
                        height={40}
                        alt='Logo Brand'
                        className='mb-4'
                        />
                      </div> : <span></span> }
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                        id="logo"
                        type="file"
                        className="w-full"
                        name='image'
                        // defaultValue={getImageUrl(data?.logo)}
                        />
                      </div>
                    </div>

                    

                  </CardContent>
                 
                </Card>
      </div>
      </form>
  )
}
