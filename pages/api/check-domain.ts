import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { domain } = req.query;

  try {
    if (!domain || typeof domain !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing domain parameter" });
    }

    const projectDetails = await prisma.project.findUnique({
      where: {
        domain: domain.toLowerCase(),
      },
    });

    if (!projectDetails) {
      return res.status(200).json({ exists: false });
    }

    res.status(200).json({ exists: true });
  } catch (error) {
    console.error("Error occurred while checking domain:", error);
    res
      .status(500)
      .json({ error: "Error occurred while checking domain existence." });
  }
}
