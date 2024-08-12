"use client"

import { Button } from "@/components/ui/button"
import { Category } from "@prisma/client"
import {ColumnDef} from '@tanstack/react-table'
import { Edit, Trash } from "lucide-react"
import Link from "next/link"
import FormDelete from "./_component/form-delete"

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: 'name',
        header:'Category Name'
    },
    {
        id: 'actions',
        // header:'Action',
        cell:   ({row}) => {
            const category = row.original

            return (
                <div className="w-full text-right">
                    <div className="space-x-4 ">
                    <Button size='sm' asChild>
                        <Link href={`/dashboard/categories/edit/${category.id}`}>
                            <Edit className="w-4 h-4"/>
                            Edit
                        </Link>
                    </Button>
                    <FormDelete id={category.id}/>
                </div>
                </div>
            )
        }
    }
]