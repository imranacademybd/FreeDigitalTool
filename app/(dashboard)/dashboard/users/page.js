import { DataTable } from '@/components/ReusableTable/data-table'
import { manageUsersColumns } from '@/components/ReusableTable/manageUsersColumn'
import { payments } from '@/data/payments'
import React from 'react'

const ManageAllUsersPage = () => {
  return (
    <div className="container mx-auto py-10">
          <DataTable
            columns={manageUsersColumns}
            initialData={payments}
            filterInputPlaceholder={"Search Pages by Title"}
            filterInputColumn={"title"}
          />
        </div>
  )
}

export default ManageAllUsersPage
