import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { columns } from './columns'
import { getCategories } from './lib/data'
import Link from 'next/link'

export default async function CategoriesPage() {

    const data = await getCategories();

  return (
    <><div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-7 gap-1" asChild>
                  <Link href='/dashboard/categories/create'>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Category
                    </span>
                  </Link>
              </Button>
          </div>
      </div>
      <DataTable columns={columns} data={data}/>
          </>
  )
}
