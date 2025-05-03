"use client";

import axios from "axios";

import React, { useState } from "react";
import { deleteCategory } from "@/lib/actions/categoryAction";
import { toast } from "sonner";
import { DataTable } from "../ReusableTable/data-table";
import { categoryColumns } from "../ReusableTable/Category-Table/categoryColumn";
import { deleteBlogCategoryAction } from "@/lib/actions/blogs/blog-categories/deleteBlogCategory";
import { BlogsTableColumn } from "../ReusableTable/BlogsTableColumn/BlogsTableColumn";
import { refreshBlogs } from "../Refresh-Functions/blogRefreshFunction";
import { deleteBlogServerAction } from "@/lib/actions/blogs/deleteBlog";

const BlogsTable = ({ blogs }) => {
  const [blogsData, setBlogsdata] = useState(blogs || []);

  return (
    <div className="md:col-span-2 space-y-6">
      <DataTable
        columns={BlogsTableColumn}
        initialData={blogsData}
        filterInputPlaceholder={"name, category, views"}
        filterInputColumn={"title, "}
        firstSearchInputPlaceholder={"category, "}
        secondSearchInputPlaceholder={"views..."}
        filterSelectColumn={"category"}
        filterSelectLabel="Filter by Category"
        filterSelectPlaceholder="All categories"
        refreshDataInComponent={refreshBlogs}
        meta={{
          entityType: "blogs",
          handleSingleDelete: async (id) => {
            // Implement single category delete
            const result = await deleteBlogServerAction(id);
            if (result?.status === "SUCCESS") {
              setBlogsdata((prev) => prev.filter((cat) => cat._id !== id));
              await refreshBlogs();
              toast.success(result.message);
            }
          },
        }}
      />
    </div>
  );
};

export default BlogsTable;
