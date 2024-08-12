import React from 'react'
import { getCategoriesById } from '../../lib/data'
import { redirect } from 'next/navigation'
import FormCategory from '../../_component/form-category'


type Tparams = {
    id: string
}

interface EditPageProp {
    params: Tparams
}

export default async function EditPage({params}: EditPageProp) {
    const data = await getCategoriesById(params.id)

    if (!data) {
      return redirect('/dashboard/categories');
    }

    console.group(data)
  return (
    <FormCategory type='EDIT' data={data}/>
  )
}
