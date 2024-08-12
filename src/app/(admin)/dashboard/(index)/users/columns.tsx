"use client"

import { User } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import FormDelete from "./component/form-delete"

export type TColumns={
    id: number
    name: string
    email: string
    total: number
}


export const columns: ColumnDef<User>[] = [
    {
        accessorKey:'name',
        header: 'User Name'
    },
    {
        accessorKey:'email',
        header:'Email'
    },
    {
        accessorKey:'role',
        header: 'Role'
    },
    {
        id:'actions',
        cell: ({row}) => {
            const user = row.original

            return(
                  <div className="w-full text-right">
                    <div className="space-x-4 ">
                    <FormDelete id={user.id}/>
                </div>
                </div>
            )
        }
    }
]

export const columnsCust: ColumnDef<TColumns>[] = [
    {
        accessorKey:'name',
        header: 'User Name'
    },
    {
        accessorKey:'email',
        header:'Email'
    },
    {
        accessorKey:'total',
        header: 'Total Transaksi'
    },
    {
        id:'actions',
        cell: ({row}) => {
            const cust = row.original

            return(
                  <div className="w-full text-right">
                    <div className="space-x-4 ">
                    <FormDelete id={cust.id}/>
                </div>
                </div>
            )
        }
    }
]