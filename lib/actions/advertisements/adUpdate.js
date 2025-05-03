// lib/actions/advertisements/update.js
"use server";
import Advertisement from "@/models/advertisement";

import dbConnect from "@/lib/db";
import { textAdvertisementFormSchema } from "@/schemas/text-advertisement-schema";
import { imageAdvertisementFormSchema } from "@/schemas/image-advertisement-form-schema";
import { codeAdvertisementFormSchema } from "@/schemas/code-advertisement-form-schema";

const handleUpdate = async (id, values) => {
  try {
    await dbConnect();

    // Find the advertisement by ID
    const existingAd = await Advertisement.findById(id);
    if (!existingAd) throw new Error("Advertisement not found");

    // Validate based on the advertisement type
    switch (existingAd.type) {
      case "text":
        await textAdvertisementFormSchema.parseAsync(values);
        break;
      case "image":
        await imageAdvertisementFormSchema.parseAsync(values);
        break;
      case "code":
        await codeAdvertisementFormSchema.parseAsync(values);
        break;
      default:
        throw new Error("Invalid advertisement type");
    }

    // Update the advertisement in the database
    const updatedAd = await Advertisement.findByIdAndUpdate(
      id,
      {
        $set: values,
      },
      { new: true }
    );

    return { status: "SUCCESS", message: "AD updated successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateAdvertisement = handleUpdate;
