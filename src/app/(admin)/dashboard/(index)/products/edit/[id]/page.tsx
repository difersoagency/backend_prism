import React from 'react'
import { getProductsById } from '../../lib/data'

import FormProduct from '../../_component/form-product'
import { redirect } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getBrands } from '../../../brands/lib/data'
import { getLocation } from '../../../location/lib/data'
import { getCategories } from '../../../categories/lib/data'


type Tparams = {
    id: string
}

interface EditPageProp{
    params: Tparams
}


export default async function EditPage({params}: EditPageProp) {

    const data = await getProductsById(params.id)
    const brand = await getBrands();
    const location = await getLocation();
    const categories = await getCategories();
    // const currCat = '';
    // let currBrand = '';
    // let currLoc = '';

    if(!data) {
        return redirect('/dashboard/products')
    }

    

  return (
    <FormProduct type='EDIT' data={data}>
        <div className="grid gap-3">
				<Label htmlFor="category">Category</Label>
				<Select name="category" defaultValue={data.category_id.toString()}>
					<SelectTrigger
						id="category"
						aria-label="Select category"
						
					>
						<SelectValue placeholder={data.category_id.toString()} />
                        
					</SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={`${cat.id}`}>{cat.name}</SelectItem>
                        ))}
					</SelectContent>
					
				</Select>
			</div>
			<div className="grid gap-3">
				<Label htmlFor="subcategory">Brand</Label>
				<Select  name="brand" defaultValue={data.brand_id.toString()}>
					<SelectTrigger id="brand" aria-label="Select brand">
						<SelectValue placeholder={data.brand_id.toString()} />
					</SelectTrigger>
					<SelectContent>
                        {brand?.map((brn) => (
                            <SelectItem key={brn.id} value={`${brn.id}`}>{brn.name}</SelectItem>
                        ))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="subcategory">Location</Label>
				<Select name="location" defaultValue={data.location_id.toString()}>
					<SelectTrigger
						id="location"
						aria-label="Select Location"
						
					>
						<SelectValue placeholder={data.location_id.toString()} />
					</SelectTrigger>
					<SelectContent>
                        {location?.map((loc) => (
						<SelectItem key={loc.id} value={`${loc.id}`}>{loc.name}</SelectItem>

                        ))}
					</SelectContent>
				</Select>
			</div>
    </FormProduct>
  )
}
