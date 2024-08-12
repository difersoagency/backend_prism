"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getImageUrl } from "@/lib/supabase"
import { dateFormat, rupiahFormat } from "@/lib/utils"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import FormDelete from "./_component/form-delete"

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: 'name',
        header:'Products Name',
        cell: ({row})=> {
            const product = row.original

            return(
                <div className="flex items-center gap-x-6">
                    <Image
                    src={getImageUrl(product.image[0], 'product')}
                    width={60}
                    height={60}
                    alt={product.name}
                    />
                    <h2>{product.name}</h2>
                </div>
            )
        }
    },
    {
        accessorKey:'price',
        header:'Price',
        cell: ({row}) => {
            const product = row.original

            return rupiahFormat(product.price);
        }
    },
    {
        accessorKey: 'stock',
        header:'Product Stock',
        cell: ({row}) => {
            const product = row.original

            return(
                <Badge variant={product.stock === 'preorder' ? 'destructive' : 'secondary'}>{product.stock}</Badge>
            )
        }
    },
    {
        accessorKey: 'create_at',
        header:'Created At',
        cell: ({row}) => {
            const product = row.original

            return dateFormat(product.create_at)
        }
    },
    {
        id:'actions',
        cell: ({row}) => {
            const product = row.original

            return(
                  <div className="w-full text-right">
                    <div className="space-x-4 ">
                    <Button size='sm' asChild>
                        <Link href={`/dashboard/products/edit/${product.id}`}>
                            <Edit className="w-4 h-4"/>
                            Edit
                        </Link>
                    </Button>
                    <FormDelete id={product.id}/>
                </div>
                </div>
            )
        }
    }
]