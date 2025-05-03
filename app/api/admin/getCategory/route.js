// app/api/categories/route.js
import { NextResponse } from "next/server";

import Category from "@/models/Category";
import dbConnect from "@/lib/db";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request?.url);
 
    const homepage = searchParams?.get("homepage") === "true";

    // Build your filter: empty → all categories, or { homepage: true }
    const filter = homepage ? { homepage: true } : {};

    let query = Category.find(filter);

   const categories = await query.lean().exec();

    return NextResponse.json(
      {
        status: "SUCCESS",
        message: "Categories fetched successfully",
        data: categories,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=60",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "ERROR",
        error: error.message || "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );
  }
}
