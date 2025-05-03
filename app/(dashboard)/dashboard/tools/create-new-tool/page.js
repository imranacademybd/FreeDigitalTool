export const dynamic = "force-dynamic";
import CreateToolsForm from "@/components/CreateToolPage";
import axios from "axios";

const CreateNewToolPage = async () => {
  // use axios to fetch categories
  const res = await axios("http://localhost:3000/api/admin/getCategory");
  const categories = res?.data?.data;
  return (
    <div className="min-h-screen flex flex-col justify-start items-center w-full">
      <h1 className="font-bold text-3xl my-10">Create New Tool</h1>
      <CreateToolsForm categories={categories} />
    </div>
  );
};

export default CreateNewToolPage;
