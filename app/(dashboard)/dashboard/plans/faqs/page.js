import { columns } from '@/components/ReusableTable/column'
import { DataTable } from '@/components/ReusableTable/data-table'
import { Button } from '@/components/ui/button'
import { payments } from '@/data/payments'
import Link from 'next/link'
import React from 'react'

const FaqPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage Faqs</h2>
        <Link href={"/dashboard/plans/faqs/create-faqs"}>
          <Button className="">Create New Faq</Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        initialData={payments}
        filterInputPlaceholder={"Search Pages by Title"}
        filterInputColumn={"title"}
      />
    </div>
  );
}

export default FaqPage
