import {
  NextApiRequest,
  NextApiResponse,
  PrismaClient,
  jwt,
  parse,
} from "@/helpers/imports";
import redis from "@/utils/redis";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const uuidValue = cookies.auth;
    const sessionToken = await redis.get(uuidValue);
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || "sdwfesbydtnfmg";

    if (!sessionToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = jwt.verify(sessionToken, jwtSecret) as {
      email: { email: string };
    };

    if (!decodedToken || !decodedToken.email || !decodedToken.email.email) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const user = await prisma.user.findUnique({
      where: { email: decodedToken.email.email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ email: user.email });
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
