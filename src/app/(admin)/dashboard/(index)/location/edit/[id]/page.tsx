import React from 'react'
import { getLocationById } from '../../lib/data'
import { redirect } from 'next/navigation'
import FormLocation from '../../_component/form-location'


type Tparams = {
    id: string
}

interface EditPageProp {
    params: Tparams
}

export default async function EditPage({params}: EditPageProp) {
    const data = await getLocationById(params.id)

    if (!data) {
      return redirect('/dashboard/location');
    }

    console.group(data)
  return (
    <FormLocation type='EDIT' data={data}/>
  )
}
