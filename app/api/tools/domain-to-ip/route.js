import { NextResponse } from "next/server";
import { validateDomain } from "@/lib/utils";
import dns from "dns";

export const runtime = "nodejs";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { domain } = body;
  console.log("Domain:", domain);
  console.log("Request body:", body);

  if (!domain || !validateDomain(domain)) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 });
  }

  try {
    const ipAddress = await dns.promises
      .resolve(domain)
      .then((addresses) => addresses[0])
      .catch(() => null);

    if (!ipAddress) {
      return NextResponse.json(
        { error: "Domain resolution failed" },
        { status: 404 }
      );
    }

    // Step 2: Get IP information (using ipinfo.io example)
    const response = await fetch(
      `https://ipinfo.io/${ipAddress}/json?token=${process.env.IPINFO_TOKEN}`
    );
    const data = await response.json();

    // Format response for the frontend
    const formattedData = {
      ip: data.ip,
      hostname: data.hostname || domain,
      location: `${data.city}, ${data.region}, ${data.country}`,
      isp: data.org?.split(" ").slice(1).join(" ") || "Unknown ISP",
      timezone: data.timezone,
      coordinates: data.loc?.split(","),
      asn: data.org?.split(" ")[0] || "N/A",
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching IP information:", error);
    return NextResponse.json(
      { error: "Failed to retrieve IP information", details: error.message },
      { status: 500 }
    );
  }
}
