// lib/actions/planActions/deleteMultiplePlans.js
"use server";

import dbConnect from "@/lib/db";
import Plans from "@/models/Plans";

export const deleteMultiplePlansServerAction = async (ids) => {
  await dbConnect();
  try {
    const result = await Plans.deleteMany({ _id: { $in: ids } });
    console.log("Bulk Delete Result:", result);
    
    return {
      status: "SUCCESS",
      message: `plans deleted successfully`,
    };
  } catch (error) {
    console.error("Bulk Delete Error:", error);
    return {
      status: "ERROR",
      message: error.message,
    };
  }
};
