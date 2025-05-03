// app/api/advertisements/route.js
import dbConnect from "@/lib/db";
import Advertisement from "@/models/advertisement";

export async function GET() {
  try {
    await dbConnect();

    const ads = await Advertisement.find({}).sort({ createdAt: -1 });

    return new Response(JSON.stringify(ads), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
