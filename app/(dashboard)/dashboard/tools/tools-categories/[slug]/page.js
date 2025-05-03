// app/dashboard/categories/edit/[slug]/page.js
import EditCategoryForm from "@/components/EditCategoryForm";
import dbConnect from "@/lib/db";
import Category from "@/models/Category";
import { notFound } from "next/navigation";

const EditCategoryPage = async ({ params }) => {
  const { slug } = await params;
  await dbConnect();
  const category = await Category.findOne({ slug }).lean();

  if (!category) return notFound();

  // Convert MongoDB ObjectId to string
  category._id = category._id.toString();

  return (
    <div className="min-h-screen container mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-8">Edit {category.name}</h2>
      <EditCategoryForm initialData={category} />
    </div>
  );
};

export default EditCategoryPage;
