export const dynamic = "force-dynamic";
import BlogsTable from "@/components/BlogCategories/BlogsTable";
import { refreshBlogs } from "@/components/Refresh-Functions/blogRefreshFunction";
import { BlogsTableColumn } from "@/components/ReusableTable/BlogsTableColumn/BlogsTableColumn";
import { DataTable } from "@/components/ReusableTable/data-table";
import { axiosClient } from "@/lib/apiClient";

import React from "react";

const page = async () => {
  const blogsRes = await axiosClient.get("/api/blogs");

  const blogs = blogsRes?.data?.simplifiedBlogs || [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Blogs</h2>
      </div>
      <BlogsTable blogs={blogs} />
    </div>
  );
};

export default page;
