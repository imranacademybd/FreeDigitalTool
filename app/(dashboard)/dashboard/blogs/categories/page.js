export const dynamic = "force-dynamic";

import BlogCategoriesTable from "@/components/BlogCategories/BlogCategoriesTable";
import CreateBlogCategoryForm from "@/components/BlogCategories/CreateBlogCategory";
import axios from "axios";
import React from "react";

const page = async () => {
  const parentCategoryResponse = await axios(
    "http://localhost:3000/api/admin/getCategory"
  );

  const blogCategoryResponse = await axios(
    "http://localhost:3000/api/blogs/blog-categories"
  );
  const blogCategories = blogCategoryResponse?.data?.simplifiedBlogsCategories;

  const parentCategories = parentCategoryResponse.data.data;

  return (
    <div className="min-h-screen w-full container mx-auto py-10 max-w-7xl  p-6 bg-white shadow-lg rounded-2xl border border-gray-200 grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* categories form */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Create New Blog Category</h2>
        <CreateBlogCategoryForm parentCategories={parentCategories} />
      </div>
      {/* categories table */}
      <BlogCategoriesTable categories={blogCategories} />
    </div>
  );
};

export default page;
