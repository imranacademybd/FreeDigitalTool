"use client";


import { categoryColumns } from "./ReusableTable/Category-Table/categoryColumn";
import { DataTable } from "./ReusableTable/data-table";

import React, { useState } from "react";
import { deleteCategory } from "@/lib/actions/categoryAction";
import { toast } from "sonner";
import { axiosClient } from "@/lib/apiClient";

const AdminCategoryMainPageTable = ({ categories }) => {
  const [categoriesData, setCategoriesData] = useState(categories || []);

  const refreshData = async () => {
    const res = await axiosClient.get("/api/admin/getCategory");
    const categories = res.data.data;
    return categories;
  };
  return (
    <div className="md:col-span-2 space-y-6">
      <DataTable
        columns={categoryColumns}
        initialData={categoriesData}
        filterInputPlaceholder={"Search Pages by Name"}
        filterInputColumn={"name"}
        filterSelectColumn="title"
        filterSelectLabel="Filter by Title"
        filterSelectPlaceholder="All Titles"
        firstSearchInputPlaceholder={"name"}
        secondSearchInputPlaceholder={"title"}
        refreshDataInComponent={refreshData}
        meta={{
          entityType: "category",
          handleSingleDelete: async (id) => {
            try {
              const result = await deleteCategory(id);
              if (result.status === "SUCCESS") {
                setCategoriesData((prev) =>
                  prev.filter((cat) => cat._id !== id)
                );
                toast.success(result.message);
                await refreshData(); // Consider if you need this - local state is already updated
              }
            } catch (error) {
              toast.error(error.message || "Failed to delete category");
            }
          },
          handleHomepageToggle: async (id, currentStatus) => {
          
            
            try {
              const result = await axiosClient.patch(
                `/api/admin/categories/${id}/homepage`,
                {
                  homepage: !currentStatus,
                }
              );

              if (result.data.status === "SUCCESS") {
                setCategoriesData((prev) =>
                  prev.map((cat) =>
                    cat._id === id ? { ...cat, homepage: !currentStatus } : cat
                  )
                );
                toast.success("Homepage status updated");
                // await refreshData(); // Only needed if other fields might change
              }
            } catch (error) {
              // Rollback optimistic update
              setCategoriesData((prev) =>
                prev.map((cat) =>
                  cat._id === id ? { ...cat, homepage: currentStatus } : cat
                )
              );
              toast.error(
                error.response?.data?.error || "Failed to update status"
              );
            }
          },
        }}
      />
    </div>
  );
};

export default AdminCategoryMainPageTable;
