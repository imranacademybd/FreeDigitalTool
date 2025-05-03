// app/api/uploadImage/route.js

import axios from "axios";

export async function POST(req) {
  const formData = new FormData();
  const file = await req.formData();
  formData.append("image", file.get("image"));

  const imgBBApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY; // Store API key in .env file

  try {
    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          key: imgBBApiKey,
        },
      }
    );

    if (response.data.success) {
      return new Response(JSON.stringify({ url: response.data.data.url }), {
        status: 200,
      });
    } else {
      return new Response("Image upload failed", { status: 500 });
    }
  } catch (error) {
    return new Response("Error uploading image", { status: 500 });
  }
}
