export const dynamic = "force-dynamic";
export const revalidate = 0;
import PlansDataTable from "@/components/Plans/PlansDataTable";
import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { payments } from "@/data/payments";
import axios from "axios";
import React from "react";

const AllPlansTable = async () => {
  const res = await axios("http://localhost:3000/api/plans");
  const plans = res?.data || [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Plans</h2>
      </div>
      <PlansDataTable plans={plans} />
    </div>
  );
};

export default AllPlansTable;
