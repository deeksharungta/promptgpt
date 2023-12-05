import {
  NextApiRequest,
  NextApiResponse,
  PrismaClient,
  jwt,
  serialize,
  uuidv4,
} from "@/helpers/imports";
import redis from "@/utils/redis";

const prisma = new PrismaClient();

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

      const existingUser = await prisma.user.findUnique({
        where: { email: email.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: email.email,
          },
        });
      }

      const expiresIn = 7 * 24 * 60 * 60;

      const sessionToken = jwt.sign({ email }, jwtSecret, {
        expiresIn: expiresIn,
      });

      const uuidValue = uuidv4();
      redis.set(uuidValue, sessionToken);
      redis.expire(uuidValue, expiresIn);

      res.setHeader(
        "Set-Cookie",
        serialize("auth", uuidValue, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: expiresIn,
          path: "/",
        })
      );

      res.status(200).json({ data: email, message: "Logged in successfully" });
      res.end();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
