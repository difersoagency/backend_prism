import React from "react";
import FormProduct from "../_component/form-product";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getBrands } from "../../brands/lib/data";
import { getLocation } from "../../location/lib/data";
import { getCategories } from "../../categories/lib/data";

export default async function CreatePage() {

    const brand = await getBrands();
    const location = await getLocation();
    const categories = await getCategories();

	return (
		<FormProduct>
			<div className="grid gap-3">
				<Label htmlFor="category">Category</Label>
				<Select name="category">
					<SelectTrigger
						id="category"
						aria-label="Select category"
						
					>
						<SelectValue placeholder="Select category" />
                        
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
				<Select  name="brand">
					<SelectTrigger id="brand" aria-label="Select brand">
						<SelectValue placeholder="Select brand" />
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
				<Select name="location">
					<SelectTrigger
						id="location"
						aria-label="Select Location"
						
					>
						<SelectValue placeholder="Select Location" />
					</SelectTrigger>
					<SelectContent>
                        {location?.map((loc) => (
						<SelectItem key={loc.id} value={`${loc.id}`}>{loc.name}</SelectItem>

                        ))}
					</SelectContent>
				</Select>
			</div>
		</FormProduct>
	);
}
