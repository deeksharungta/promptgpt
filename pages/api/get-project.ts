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
  const { domain } = req.query;
  try {
    if (!domain) {
      return res
        .status(400)
        .json({ error: "Invalid or missing domain parameter" });
    }

    const projectDetails = await prisma.project.findUnique({
      where: {
        domain: domain.toString(),
      },
    });

    if (!projectDetails) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      name: projectDetails.name,
      description: projectDetails.description,
      prompt: projectDetails.prompt,
      domain: projectDetails.domain,
      apiKey: projectDetails.apiKey,
    });
  } catch (error) {
    res
      .status(403)
      .json({ error: "Error occurred while fetching project details." });
  }
}
