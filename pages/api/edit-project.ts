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
  const id = Number(req.body.id);
  if (req.method === "PUT") {
    try {
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const { name, description, prompt, domain, key } = req.body;
      const subdomain = domain.toLowerCase();
      const updatedProject = await prisma.project.update({
        where: {
          id: id,
        },
        data: {
          name,
          description,
          prompt,
          domain: subdomain,
          apiKey: key,
        },
      });

      res.status(200).json(updatedProject);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Error occurred while updating the project." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
