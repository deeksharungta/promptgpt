import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || "sdwfesbydtnfmg";

    try {
      const email = jwt.verify(token, jwtSecret) as {
        email: string;
      };
      console.log("email", email);
      const sessionToken = jwt.sign({ email }, jwtSecret, {
        expiresIn: "1h",
      });

      res.setHeader(
        "Set-Cookie",
        serialize("auth", sessionToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        })
      );

      res.status(200).json({ data: email, message: "Logged in successfully" });
      res.writeHead(302, { Location: "/setup" });
      res.end();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
