export const dynamic = "force-dynamic";
import CreatePlanForm from "@/components/create-plan-form";
import axios from "axios";
import React from "react";

const CreatePlan = async () => {
  const res = await axios("http://localhost:3000/api/admin/tools");
  const tools = res?.data || [];
  return (
    <div className="container mx-auto py-10 space-y-10">
      <CreatePlanForm tools={tools} />
    </div>
  );
};

export default CreatePlan;
