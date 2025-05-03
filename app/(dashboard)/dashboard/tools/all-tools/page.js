export const dynamic = "force-dynamic";
import { refreshDataTools } from "@/components/Refresh-Functions/toolsRefreshFunction";
import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { payments } from "@/data/payments";
import { axiosClient } from "@/lib/apiClient";

import React from "react";

const AllToolsPage = async () => {
  const res = await axiosClient.get("/api/admin/tools");
  const tools = res?.data || [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Tools</h2>
      </div>
      <DataTable
        columns={columns}
        initialData={tools}
        filterInputPlaceholder={"name, category, views"}
        filterInputColumn={"name"}
        firstSearchInputPlaceholder={"name"}
        secondSearchInputPlaceholder={"category"}
        thirdSearchInputPlaceholder={"and views"}
        filterSelectColumn={"category"}
        filterSelectLabel="Filter by Category"
        filterSelectPlaceholder="All categories"
        refreshDataInComponent={refreshDataTools}
        meta={{
          entityType: "tools",
        }}
        fetchUrl={"http://localhost:3000/api/admin/tools"}
      />
    </div>
  );
};

export default AllToolsPage;
