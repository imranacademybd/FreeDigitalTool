import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ToolModel from "@/models/Tools";

// GET /api/admin/tools
export async function GET(request) {
  await dbConnect();
  try {
    // Check if params is available and destructure category
    const { searchParams } = new URL(request?.url);
    const category = searchParams?.get("category");

    if (category) {
      // If category exists, query by category
      const tools = await ToolModel.find({ category });
      return NextResponse.json(tools, { status: 200 });
    }

    // If no category is provided, fetch all tools
    const tools = await ToolModel.find();
    return NextResponse.json(tools, { status: 200 });
  } catch (error) {
    console.log("Error fetching tools:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}
