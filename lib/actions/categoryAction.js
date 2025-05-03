// lib/actions/categoryActions.js
"use server";

import { toolsCategoryFormSchema } from "@/schemas/tools-category-form-schema";
import dbConnect from "../db";
import Category from "@/models/Category";

// 1. Check Slug Uniqueness
export const checkCategorySlug = async (slug) => {
  await dbConnect();
  try {
    const existingCategory = await Category.findOne({ slug });
    return {
      isUnique: !existingCategory,
      message: existingCategory ? "Slug already exists" : "Slug is available",
    };
  } catch (error) {
    return { error: "Error checking slug", status: "ERROR" };
  }
};

// 2. Create Category
export const createCategory = async (data) => {
  await dbConnect();
  try {
    // Validate with Zod
    const validatedData = toolsCategoryFormSchema.parse(data);

    // Check slug uniqueness
    const slugCheck = await checkCategorySlug(validatedData.slug);
    if (!slugCheck.isUnique) {
      return { error: "Slug must be unique", status: "ERROR" };
    }

    // Create new category
    const newCategory = await Category.create(validatedData);
    return {
      status: "SUCCESS",
      message: "Category created successfully",
      data: JSON.parse(JSON.stringify(newCategory)),
    };
  } catch (error) {
    return {
      error: error.message || "Failed to create category",
      status: "ERROR",
    };
  }
};

// 3. Update Category
export const updateCategory = async (id, data) => {
  await dbConnect();
  try {
    const validatedData = toolsCategoryFormSchema.parse(data);
   

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      validatedData,
      { new: true, runValidators: true }
    );

    return {
      status: "SUCCESS",
      message: "Category updated successfully",
      data: JSON.parse(JSON.stringify(updatedCategory)),
    };
  } catch (error) {
    return {
      error: error.message || "Failed to update category",
      status: "ERROR",
    };
  }
};

// ?Toggle Homepage Status
export const toggleHomepageStatus = async (id, currentStatus) => {
  await dbConnect();
  console.log("toggleHomepageStatus", id, currentStatus);
  
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { homepage: currentStatus },
      { new: true, runValidators: true }
    );
    console.log("Updated Category", updatedCategory);
    
    return {
      status: "SUCCESS",
      message: "Homepage status updated",
      data: JSON.parse(JSON.stringify(updatedCategory)),
    };
  } catch (error) {
    console.log("Error updating category", error);
    
    return { error: error.message || "Update failed", status: "ERROR" };
  }
};

// 4. Delete Single Category
export const deleteCategory = async (id) => {
  await dbConnect();
  try {
    const category = await Category.findById(id);

    // Prevent deletion if category has tools
    if (category.toolsCount > 0) {
      return {
        error: "Cannot delete category with existing tools",
        status: "ERROR",
      };
    }

    await Category.findByIdAndDelete(id);
    return {
      status: "SUCCESS",
      message: "Category deleted successfully",
    };
  } catch (error) {
    return {
      error: error.message || "Failed to delete category",
      status: "ERROR",
    };
  }
};

// 5. Delete Multiple Categories
export const deleteMultipleCategories = async (ids) => {
  await dbConnect();
  try {
    // Check if any category has tools
    console.log("categories ids", ids);
    
    if (!Array.isArray(ids)) {
      return Response.json({
        error: "Invalid input formant",
        status: "ERROR",
      });
    }
    const categories = await Category.find({ _id: { $in: ids } });
      const canDelete = categories.every((cat) => cat.toolsCount === 0);

    if (!canDelete) {
      return {
        error: "Some categories contain tools - cannot delete",
        status: "ERROR",
      };
    }
    const result = await Category.deleteMany({ _id: { $in: ids } });
    return {
      status: "SUCCESS",
      message: ` categories deleted`,
    };
  } catch (error) {
    return {  message:"Bulk delete failed", status: "ERROR" };
  }
};


// lib/actions/categoryActions.js
export const incrementToolsCount = async (categoryName) => {
  await dbConnect();
  return Category.updateOne(
    { name: categoryName },
    { $inc: { toolsCount: 1 } }
  );
};

export const decrementToolsCount = async (categoryName) => {
  await dbConnect();
     await Category.updateOne(
       { name: categoryName },
       { $inc: { toolsCount: -1 } }
     );

     // Then, ensure the count doesn't fall below 0
     await Category.updateOne(
       { name: categoryName, toolsCount: { $lt: 0 } },
       { $set: { toolsCount: 0 } }
     );
};