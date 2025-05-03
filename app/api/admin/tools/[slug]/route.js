import dbConnect from "@/lib/db";
import ToolModel from "@/models/Tools";

export async function GET(request, {params}) {
  await dbConnect();

  const { slug } = await params;

  
   // Extract slug from the request parameters

  try {
    const tool = await ToolModel.findOne({ slug }); // Query the database using the slug
    if (!tool) {
      return new Response(JSON.stringify({ error: "Tool not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(tool), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}