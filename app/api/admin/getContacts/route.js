// i need to get all the contacts from the database
import dbConnect from "@/lib/db";
import Contact from "@/models/contactUs";


export async function GET() {
  try {
    await dbConnect();



   

    const contacts = await Contact.find().sort({ createdAt: -1 }).lean(); 
    // Check if blogs are found
    

    return Response.json({
      status: "SUCCESS",
      contacts,
      message: "Contacts fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching contacts:", err);
    return Response.json(
      { status: "ERROR", message: err.message },
      { status: 500 }
    );
  }
}
