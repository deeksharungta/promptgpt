import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import redis from "@/utils/redis";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = parse(req.headers.cookie || "");
  const uuidValue = cookies.auth;
  const sessionToken = await redis.get(uuidValue);
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

  res.status(200).json({ email: user.email });
}
