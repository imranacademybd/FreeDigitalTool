// lib/actions/planActions/deletePlan.js
"use server";

import dbConnect from "@/lib/db";
import Plans from "@/models/Plans";

export const deletePlanServerAction = async (id) => {
  await dbConnect();
  try {
    await Plans.findByIdAndDelete(id);
    return {
      status: "SUCCESS",
      message: "Plan deleted successfully",
    };
  } catch (error) {
    console.error("Delete Plan Error:", error);
    return {
      status: "ERROR",
      message: error.message,
    };
  }
};
