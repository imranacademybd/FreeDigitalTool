// pages/api/conversions.js

import dbConnect from "@/lib/db";
import Conversion from "@/models/Conversion";


export default async function handler(req, res) {
  await dbConnect();

  // Save conversion
  if (req.method === "POST") {
    try {
      const conversion = await Conversion.create(req.body);
      res.status(201).json(conversion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get recent conversions
  if (req.method === "GET") {
    try {
      const conversions = await Conversion.find()
        .sort({ createdAt: -1 })
        .limit(10);
      res.status(200).json(conversions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
