import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { getBrands } from './lib/data'
import { columns } from './columns'

export default async function BrandsPage() {

    const brand = await getBrands();

  return (
    <><div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="h-7 gap-1" asChild>
                  <Link href='/dashboard/brands/create'>
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Add New Brands
                      </span>
                  </Link>
              </Button>
          </div>
      </div><DataTable columns={columns} data={brand} /></>
  )
}
