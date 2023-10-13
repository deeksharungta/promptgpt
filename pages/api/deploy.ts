import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { parse } from "cookie";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, description, prompt, domain, key } = req.body;

    const cookies = parse(req.headers.cookie || "");
    const sessionToken = cookies.auth;
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || "sdwfesbydtnfmg";

    if (!sessionToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const email = jwt.verify(sessionToken, jwtSecret) as {
      email: {
        email: string;
      };
    };

    const user = await prisma.user.findUnique({
      where: { email: email.email.email },
    });

    if (user === null) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;

    try {
      // Assuming you have a 'Project' model
      const newProject = await prisma.project.create({
        data: {
          name,
          description,
          prompt,
          domain,
          apiKey: key,
          userId: userId,
        },
      });

      res.status(201).json({ success: true, data: newProject });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
