export const dynamic = "force-dynamic";
import CreateToolsForm from "@/components/CreateToolPage";
import { axiosClient } from "@/lib/apiClient";


const CreateNewToolPage = async () => {
  // use axios to fetch categories
  const res = await axiosClient.get("/api/admin/getCategory");
  const categories = res?.data?.data;
  return (
    <div className="min-h-screen flex flex-col justify-start items-center w-full">
      <h1 className="font-bold text-3xl my-10">Create New Tool</h1>
      <CreateToolsForm categories={categories} />
    </div>
  );
};

export default CreateNewToolPage;
