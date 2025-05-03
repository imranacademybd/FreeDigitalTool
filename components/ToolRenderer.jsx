// components/ToolRenderer.tsx
"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";





const ToolRenderer = ({ toolSlug,  }) => {


 
  const ToolComponent = dynamic(() => import(`@/tools/${toolSlug}`), {
    loading: () => <Skeleton className="h-[400px] w-full" />,
  });





  try {
    return (
      <div className="min-h-[550px] flex flex-col justify-center items-center w-full  p-4">
        {" "}
        <ToolComponent />{" "}
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500 p-4 border rounded-lg bg-red-50">
        Error loading tool. Please try again later.
      </div>
    );
  }
};

export default ToolRenderer;
