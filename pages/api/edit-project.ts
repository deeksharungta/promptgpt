import {
  NextApiRequest,
  NextApiResponse,
  PrismaClient,
} from "@/helpers/imports";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const domain = req.body.domain;
  if (req.method === "PUT") {
    try {
      if (!domain) {
        return res.status(400).json({ error: "Invalid domain" });
      }

      const { name, description, prompt, apiKey } = req.body;
      const subdomain = domain.toLowerCase();
      const updatedProject = await prisma.project.update({
        where: {
          domain: subdomain,
        },
        data: {
          name,
          description,
          prompt,
          domain: subdomain,
          apiKey: apiKey,
        },
      });

      res.status(200).json(updatedProject);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error occurred while updating the project." });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
