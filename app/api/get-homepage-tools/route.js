
import dbConnect from "@/lib/db";
import ToolModel from "@/models/Tools";

export async function GET() {
  await dbConnect();

  try {
    const query = { homepage: true };
    const tool = await ToolModel.findOne(query).lean().exec();
    
    return Response.json({
        success: true,
        tool
    }, {status: 200});
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
