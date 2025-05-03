"use client";



import React, { useState } from "react";
import { toast } from "sonner";
import { DataTable } from "../ReusableTable/data-table";

import { deleteBlogCategoryAction } from "@/lib/actions/blogs/blog-categories/deleteBlogCategory";
import { blogCategoryColumns } from "../ReusableTable/BlogsTableColumn/BlogsCategoryTableColumn";
import { axiosClient } from "@/lib/apiClient";

const BlogCategoriesTable = ({ categories }) => {
  const [categoriesData, setCategoriesData] = useState(categories || []);

  const refreshData = async () => {
    const res = await axiosClient.get(
      "/api/blogs/blog-categories"
    );
    const categories = res?.data?.categories;
    return categories;
  };

  
  return (
    <div className="md:col-span-2 space-y-6">
      <DataTable
        columns={blogCategoryColumns}
        initialData={categoriesData}
        filterInputPlaceholder={"Search Pages by Name"}
        filterInputColumn={"name"}
        filterSelectColumn={"parentCategory"}
        filterSelectLabel="Filter by Title"
        filterSelectPlaceholder="Parent Category"
        firstSearchInputPlaceholder={"name"}
        secondSearchInputPlaceholder={"title"}
        
        refreshDataInComponent={refreshData}
        meta={{
          entityType: "blogCategory",
          handleSingleDelete: async (id) => {
            // Implement single category delete
            const result = await deleteBlogCategoryAction(id);
            if (result?.status === "SUCCESS") {
              setCategoriesData((prev) => prev.filter((cat) => cat._id !== id));
              refreshData();
              toast.success(result.message);
            }
          },
        }}
      />
    </div>
  );
};

export default BlogCategoriesTable;
