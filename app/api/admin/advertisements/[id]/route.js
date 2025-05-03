// app/api/advertisements/[id]/route.js
import Advertisement from "@/models/advertisement";
import dbConnect from "@/lib/db";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params;

    const ad = await Advertisement.findById(id);
    if (!ad) {
      return new Response(
        JSON.stringify({ error: "Advertisement not found" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(ad), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
