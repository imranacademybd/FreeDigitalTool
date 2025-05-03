// lib/actions/planActions/createPlan.js
"use server";

import dbConnect from "@/lib/db";
import Plans from "@/models/Plans";
import { planFormSchema } from "@/schemas/planFormSchema";


export const createPlanServerAction = async (formData) => {

  
  await dbConnect();
  try {
    const validated = planFormSchema.parse(formData);

    const plan = new Plans(validated);
    await plan.save();

    

    return {
      status: "SUCCESS",
      message: "Plan created successfully",

    };
  } catch (error) {
    console.error("Create Plan Error:", error);
    return {
      status: "ERROR",
      message: error.message,
    };
  }
};
