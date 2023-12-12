import { NextApiRequest, NextApiResponse, jwt } from "@/helpers/imports";
import nodemailer from "nodemailer";

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
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "rungtadeeksha@gmail.com",
      to: email,
      subject: "Magic Link Authentication",
      html: `
      <p>Hello,</p>
      <p>You've requested to log in using a magic link.</p>
      <p>Click <a href="https://www.promptgpt.tools/verify-email/?token=${token}">here</a> to log in.</p>
      <p>Please note that the magic link will expire in 15 minutes for security reasons.</p>
      <p>If you didn't request this login, you can ignore this email.</p>
      <p>Best regards,<br/><strong>PromptGPT</strong></p>
    `,
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
