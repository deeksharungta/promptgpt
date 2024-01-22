import { NextApiRequest, NextApiResponse } from "@/helpers/imports";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { messages, apiKey, userMessage } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [...messages, { role: "user", content: userMessage }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API request failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
