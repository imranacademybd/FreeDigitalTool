// lib/actions/advertisements/create.js
"use server";

import dbConnect from "@/lib/db";
import Advertisement from "@/models/advertisement";
import { textAdvertisementFormSchema } from "@/schemas/text-advertisement-schema";
import { imageAdvertisementFormSchema } from "@/schemas/image-advertisement-form-schema";
import { codeAdvertisementFormSchema } from "@/schemas/code-advertisement-form-schema";

const handleCreate = async (values) => {
  try {
    await dbConnect();

    let validatedData;
    switch (values.type) {
      case "text":
        validatedData = await textAdvertisementFormSchema.parseAsync(values);
        break;
      case "image":
        validatedData = await imageAdvertisementFormSchema.parseAsync(values);
        break;
      case "code":
        validatedData = await codeAdvertisementFormSchema.parseAsync(values);
        break;
      default:
        throw new Error("Invalid advertisement type");
    }

    const newAd = new Advertisement({
      name: validatedData.name,
      title: validatedData.title,
      type: validatedData.type,
      targetUrl: validatedData.targetUrl || null,
      imageUrl: validatedData.imageUrl || null,
      content: validatedData.content || null,
    });

    await newAd.save();

    return {
      status: "SUCCESS",
      id: newAd._id.toString(),
      message: "Advertisement created successfully!",
    };
  } catch (error) {
    console.log("Api error: ",error);
    
    return {
      status: "ERROR",
      error: error?.message || "Failed to create advertisement",
    };
  }
};

export const createAdvertisement = handleCreate;
