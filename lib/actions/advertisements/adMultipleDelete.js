// lib/actions/advertisements/deleteMultiple.js
"use server";

import dbConnect from "@/lib/db";
import Advertisement from "@/models/advertisement";

export const deleteMultipleAdvertisements = async (ids) => {
  try {
    await dbConnect();
    // Delete multiple advertisements by IDs
    const result = await Advertisement.deleteMany({ _id: { $in: ids } });

    return { status: "SUCCESS", message: "Advertisements deleted successfully" };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Failed to delete advertisements: " + error.message,
    };
  }
};
