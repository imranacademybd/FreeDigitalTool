// app/api/plans/route.js

import dbConnect from "@/lib/db";
import Plans from "@/models/Plans";


export async function GET() {
  await dbConnect();

  try {
    const plans = await Plans.find({}).sort({ createdAt: -1 });
    return Response.json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return Response.json({ error: "Failed to fetch plans" }, { status: 500 });
  }
}
