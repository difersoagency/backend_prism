"use client"

import { Button } from "@/components/ui/button"
import { Location } from "@prisma/client"
import {ColumnDef} from '@tanstack/react-table'
import { Edit, Trash } from "lucide-react"
import Link from "next/link"
import FormDelete from "./_component/form-delete"

export const columns: ColumnDef<Location>[] = [
    {
        accessorKey: 'name',
        header:'Location Name'
    },
    {
        id: 'actions',
        // header:'Action',
        cell:   ({row}) => {
            const location = row.original

            return (
                <div className="w-full text-right">
                    <div className="space-x-4 ">
                    <Button size='sm' asChild>
                        <Link href={`/dashboard/location/edit/${location.id}`}>
                            <Edit className="w-4 h-4"/>
                            Edit
                        </Link>
                    </Button>
                    <FormDelete id={location.id}/>
                </div>
                </div>
            )
        }
    }
]