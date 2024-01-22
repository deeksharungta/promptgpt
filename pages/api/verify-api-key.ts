import { NextApiRequest, NextApiResponse } from "@/helpers/imports";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { apiKey } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
