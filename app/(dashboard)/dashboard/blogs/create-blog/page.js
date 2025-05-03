export const dynamic = "force-dynamic";
import CreateBlogForm from "@/components/CreateBlogForm";
import { axiosClient } from "@/lib/apiClient";

import React from "react";

const page = async () => {
  const blogCatRes = await axiosClient.get(
    "/api/blogs/blog-categories"
  );
  const categories = await blogCatRes?.data?.categories;
  console.log("categories from create blog", categories);
  

  return (
    <div className="max-w-7xl mx-auto p-4 font-roboto">
      <h1 className="text-2xl font-bold my-10 text-center font-playfair-display">
        Create Blog
      </h1>
      <CreateBlogForm categories={categories} />
    </div>
  );
};

export default page;
