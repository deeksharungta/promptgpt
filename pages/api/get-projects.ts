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
  try {
    const userWithProjects = await prisma.user.findUnique({
      where: { email: user.email },
      include: { projects: true },
    });

    if (!userWithProjects) {
      return res.status(404).json({ error: "No projects found" });
    }

    res.status(200).json({ projects: userWithProjects.projects });
  } catch (error) {
    console.error("Error fetching user and projects:", error);
  } finally {
    await prisma.$disconnect();
  }
}
