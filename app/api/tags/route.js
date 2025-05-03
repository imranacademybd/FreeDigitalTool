
import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const videoUrl = searchParams.get("url");

  if (!videoUrl) {
    return Response.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const response = await axios.get(videoUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Extracting the video title
    const title = $('meta[name="title"]').attr("content") || $("title").text();

    // Extracting the tags from the meta tag
    const metaTag = $('meta[name="keywords"]').attr("content");

    if (metaTag) {
      const tags = metaTag.split(",").map((tag) => tag.trim());
      return Response.json({ title, tags });
    } else {
      return Response.json({ error: "No tags found" }, { status: 404 });
    }
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch video page", details: error.message },
      { status: 500 }
    );
  }
}
