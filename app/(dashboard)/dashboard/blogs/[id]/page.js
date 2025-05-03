import EditBlogForm from "@/components/EditBlogForm";
import { axiosClient } from "@/lib/apiClient";


const BlogEditPage = async ({ params }) => {
  const { id } = await params;
  const blogsRes = await axiosClient.get(`/api/blogs/${id}`);
  const blog = await blogsRes?.data?.simplifiedBlogs;
  const blogCatRes = await axiosClient(
    "/api/blogs/blog-categories"
  );
  const categories = await blogCatRes?.data?.simplifiedBlogsCategories;

  

  return (
    <div className="p-6 flex  flex-col space-y-10 ">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Page</h1>
      <EditBlogForm initialData={blog} categories={categories} />
    </div>
  );
};

export default BlogEditPage;
