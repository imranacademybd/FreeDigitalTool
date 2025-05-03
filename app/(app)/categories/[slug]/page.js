
import { axiosClient } from "@/lib/apiClient";
import Link from "next/link";
import { cache } from "react";
import { FaTemperatureHigh } from "react-icons/fa";




const getCategoryTools = cache(async (categorySlug) => {
  const res = await axiosClient.get(
    `/api/admin/tools?category=${categorySlug}`
  );
  const tools = res?.data || [];
  return tools;
});
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categorySlug = slug?.replace(/-/g, " ");
  const tools = await getCategoryTools(categorySlug); // Fetch the blog details using the ID
  return {
    title: `${categorySlug}`,
    description: `Explore our collection of ${categorySlug} tools. We have ${tools.length} tools available in this category.`,
  };
}

const AllToolsInThisCategoryPage = async ({ params }) => {
  const { slug } = await params;
  const categorySlug = slug?.replace(/-/g, " "); // Convert "pdf-tools" to "Pdf Tools"
  const tools = await getCategoryTools(categorySlug); // Fetch the tools for the category
    
  if (!tools || tools.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 ">
        <h1 className="text-3xl font-bold capitalize text-seo-light-green">
          {categorySlug} 
        </h1>
        <p className="text-gray-600 mt-2">No tools found in this category.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-seo-light-green">
          {categorySlug} 
        </h1>
        <p className="text-gray-600 mt-2">
          All tools in this category ({tools.length})
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-white p-4 rounded-lg  shadow-[0_2px_10px_rgba(0,0,0,0.3)] border hover:shadow-[0_1px_10px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out"
          >
            <div className="font-medium text-seo-forth-color flex justify-center items-center gap-10 py-4">
              {" "}
              <span className="">
                {" "}
                <FaTemperatureHigh />{" "}
              </span>{" "}
              {tool.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllToolsInThisCategoryPage;

