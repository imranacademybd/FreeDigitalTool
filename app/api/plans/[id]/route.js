// app/api/plans/[id]/route.js

import dbConnect from "@/lib/db";
import Plans from "@/models/Plans";


export async function GET(req, { params }) {
  await dbConnect();
  const {id} = await params;
  try {
    const plan = await Plans.findById(id);
    if (!plan) {
      return Response.json({ error: "Plan not found" }, { status: 404 });
    }

    return Response.json(plan);
  } catch (error) {
    console.error("Error fetching plan:", error);
    return Response.json({ error: "Failed to fetch plan" }, { status: 500 });
  }
}
