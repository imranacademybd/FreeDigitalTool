export const dynamic = "force-dynamic";

import AdminCategoryMainPageTable from "@/components/AdminCategoryMainPageTable";

import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import ToolsCategoryForm from "@/components/tools-categories-form";
import { payments } from "@/data/payments";
import { axiosClient } from "@/lib/apiClient";

import React from "react";

const ToolsCategoriesPage = async () => {
  const res = await axiosClient.get("/api/admin/getCategory");
  const categories = res?.data?.data;

  // refresh data function. will be used to refresh data after adding new category. but function cannot be passed to client component from server component.

  return (
    <div className="min-h-screen w-full container mx-auto py-10 max-w-7xl  p-6 bg-white shadow-lg rounded-2xl border border-gray-200 grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* categories form */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Create New Tools Category</h2>
        <ToolsCategoryForm />
      </div>
      {/* categories table */}
      <AdminCategoryMainPageTable categories={categories} />
    </div>
  );
};

export default ToolsCategoriesPage;
