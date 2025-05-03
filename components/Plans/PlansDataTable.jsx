"use client";



import { DataTable } from "@/components/ReusableTable/data-table";

import { useState } from "react";
import { toast } from "sonner";
import { columns } from "../ReusableTable/column";
import { refreshPlans } from "../Refresh-Functions/plansRefreshFunction";
import { planColumns } from "../ReusableTable/PlansColumn/PlansColumn";
import { deletePlanServerAction } from "@/lib/actions/plans/deletePlan";

const PlansDataTable = ({plans}) => {
  const [plansData, setPlansData] = useState(plans || []);
  return (
    <DataTable
      columns={planColumns}
      initialData={plansData}
      filterInputPlaceholder={"Search Plans by Title"}
      filterInputColumn={"title"}
      firstSearchInputPlaceholder={"plan names"}
      filterSelectColumn={""}
      refreshDataInComponent={refreshPlans}
      meta={{
        entityType: "plans",
        handleSingleDelete: async (id) => {
          const result = await deletePlanServerAction(id);
          if (result.status === "SUCCESS") {
            setPlansData((prev) => prev.filter((ad) => ad._id !== id));
            refreshPlans();
            toast.success(result.message);
          }
        },
      }}
    />
  );
};

export default PlansDataTable;
