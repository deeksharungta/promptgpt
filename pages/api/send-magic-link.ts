import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email } = req.body;
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || "sdwfesbydtnfmg";

    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "15m",
    });
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "rungtadeeksha@gmail.com",
        pass: "cdmo teiz iosk pxdd",
      },
    });

    const mailOptions = {
      from: "rungtadeeksha@gmail.com",
      to: email,
      subject: "Magic Link Authentication",
      text: `Click the following link to log in: http://localhost:3000/verify-email/?token=${token}. The link will expire in 15 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Magic link sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error sending the magic link" });
    }
  }
}
