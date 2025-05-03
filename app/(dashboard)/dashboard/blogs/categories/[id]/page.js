import EditBlogCategoryForm from "@/components/BlogCategories/EditBlogCategory";
import { axiosClient } from "@/lib/apiClient";

import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const { id } = await params;
  const res = await axiosClient.get(
    `/api/blogs/blog-categories/${id}`
  );
  const parentCategoryResponse = await axiosClient.get(
    "/api/admin/getCategory"
  );
  const parentCategories = parentCategoryResponse.data.data;
  const { status, category: blogCategory } = res.data;
  if (status === "ERROR") {
    return notFound();
  }


  return (
    <div className="min-h-screen container mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-8">Edit {blogCategory?.name}</h2>
      <EditBlogCategoryForm
        initialData={blogCategory}
        parentCategories={parentCategories}
      />
    </div>
  );
};

export default page;
