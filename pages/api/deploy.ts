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
  if (req.method === "POST") {
    const { name, description, prompt, domain, apiKey } = req.body;

    const cookies = parse(req.headers.cookie || "");
    const uuidValue = cookies.auth;
    const sessionToken = await redis.get(uuidValue);
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET || "sdwfesbydtnfmg";

    if (!sessionToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const email = jwt.verify(String(sessionToken), jwtSecret) as {
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
    const subdomain = domain.toLowerCase();
    try {
      const newProject = await prisma.project.create({
        data: {
          name,
          description,
          prompt,
          domain: subdomain,
          apiKey: apiKey,
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
