import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getImageUrl } from "@/lib/supabase";
import { Product } from "@prisma/client";
import { Upload } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useRef } from "react";

interface ProductImageProps {
	data: Product | null
	type: 'ADD' | 'EDIT'
}

export default function UploadFile({data = null, type = 'ADD'} : ProductImageProps) {

    const ref = useRef<HTMLInputElement>(null);
    const thumbnailReF = useRef<HTMLImageElement>(null);
    const secondImage = useRef<HTMLImageElement>(null);
    const thirdImage = useRef<HTMLImageElement>(null);

    const openFolder = () => {
        if(ref.current) {
            ref.current.click()
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!thumbnailReF.current || !secondImage.current || !thirdImage.current){
            return;
        }

        if(e.target.files && e.target.files.length >= 3){
            thumbnailReF.current.src = URL.createObjectURL(e.target.files[0])
            secondImage.current.src = URL.createObjectURL(e.target.files[1])
            thirdImage.current.src = URL.createObjectURL(e.target.files[2])
        }
    }

	return (
		<div>
			<Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
				<CardHeader>
					<CardTitle>Product Images</CardTitle>
					<CardDescription>
						Lipsum dolor sit amet, consectetur adipiscing elit
					</CardDescription>
					{type === 'EDIT' ? <div className="flex gap-2">
						<Image
							alt="Product image"
							className="aspect-square  rounded-md object-cover"
							height="100"
							src={`${getImageUrl(data?.image[0],'product')}`}
							width="100"
						/>
						<Image
							alt="Product image"
							className="aspect-square  rounded-md object-cover"
							height="100"
							src={`${getImageUrl(data?.image[1],'product')}`}
							width="100"
						/>
						<Image
							alt="Product image"
							className="aspect-square  rounded-md object-cover"
							height="100"
							src={`${getImageUrl(data?.image[2],'product')}`}
							width="100"
						/>
					</div> : ''}
				</CardHeader>
				<CardContent>
					<div className="grid gap-2">
						<Image
							alt="Product image"
							className="aspect-square w-full rounded-md object-cover"
							height="300"
							src=''
							width="300"
                            ref={thumbnailReF}
						/>
						<div className="grid grid-cols-3 gap-2">
							<button>
								<Image
									alt="Product image"
									className="aspect-square w-full rounded-md object-cover"
									height="84"
									src=''
									width="84"
                                    ref={secondImage}
								/>
							</button>
							<button>
								<Image
									alt="Product image"
									className="aspect-square w-full rounded-md object-cover"
									height="84"
									src=''
									width="84"
                                    ref={thirdImage}
								/>
							</button>
							<button type="button" onClick={openFolder} className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
								<Upload className="h-4 w-4 text-muted-foreground" />
								<span className="sr-only">Upload</span>
							</button>
                            <input onChange={onChange} ref={ref} type="file" name="images" className="hidden" accept="images/" multiple />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
