import { NextApiRequest, NextApiResponse, serialize } from "@/helpers/imports";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      serialize("auth", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      })
    );

    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
