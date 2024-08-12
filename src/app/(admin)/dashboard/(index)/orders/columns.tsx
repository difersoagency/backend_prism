"use client"

import { Badge } from "@/components/ui/badge"
import { rupiahFormat } from "@/lib/utils"
import { StatusOrder } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

type TProduct = {
    name: string,
    image: string
}

export type TColumn = {
    id:number,
    product: TProduct[],
    cust_name: string,
    price:number,
    status: StatusOrder
}


export const columns: ColumnDef<TColumn>[] = [
    {
        accessorKey:'product',
        header:'Products',
        cell:({row}) => {
            const order = row.original
            return(
                <div className="flex gap-5 justify-between">
                    {order.product.map((item,i)=>(
                        <div key={`${item.name+i}`} className="inline-flex items-center gap-5">
                            <Image 
                            src={item.image} alt="Product" width={80} height={80}/>
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            )
        }
    }, 
    {
        accessorKey:'cust_name',
        header: 'Customer Name'
    },
    {
        accessorKey: 'price',
        header: 'Total Price',
        cell: ({row}) => rupiahFormat(row.original.price)
    },
    {
        accessorKey: 'status',
        header:'Order Status',
        cell: ({row}) => (
            <Badge variant={row.original.status === "failed" ? 'destructive': 'default'}></Badge>
        )
    }
]