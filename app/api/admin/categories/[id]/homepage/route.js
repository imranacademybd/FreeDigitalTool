import { toggleHomepageStatus } from "@/lib/actions/categoryAction";
import { NextResponse } from "next/server";
export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    
    const { homepage } = await req.json();




    const result = await toggleHomepageStatus(id, homepage);

    if (result.status === "SUCCESS") {
      return NextResponse.json(result, { status: 200 });
    }
    return NextResponse.json(result, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
