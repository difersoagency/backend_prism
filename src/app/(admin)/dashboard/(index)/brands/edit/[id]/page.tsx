import React from 'react'
import FormBrand from '../../_components/form-brand'
import { getBrandsById } from '../../lib/data'
import { redirect } from 'next/navigation'

type Tparams = {
  id: string
}

interface EditPageProp {
  params: Tparams
}

export default async function EditPage({params}: EditPageProp) {

  const data = await getBrandsById(params.id)

  if(!data){
    return redirect('dashboard/brands')
  }

  console.log(data)
  return (
    <FormBrand type='EDIT' data={data}/>
  )
}
