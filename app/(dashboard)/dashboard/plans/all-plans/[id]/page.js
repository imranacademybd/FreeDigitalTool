import EditPlanForm from '@/components/Plans/EditPlanForm';
import axios from 'axios';
import React from 'react'

const page = async ({params}) => {
     const { id } = await params;
  const responsePlan = await axios(`http://localhost:3000/api/plans/${id}`);
  const responseTools = await axios("http://localhost:3000/api/admin/tools");
  const tools = responseTools?.data || [];
  const plan = await responsePlan?.data || null;

  

 
  
  return (
    <div className="min-h-screen flex flex-col gap-y-14 justify-center items-center w-full">
      <h2 className="text-2xl font-semibold">
        Edit Tool {plan.name} 
      </h2>
      <EditPlanForm plan={plan} tools={tools} />
    </div>
  );
}

export default page
