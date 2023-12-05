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
  if (req.method === "DELETE") {
    const projectId = Number(req.body.id);
    try {
      if (isNaN(projectId)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }

      const deleteProject = await prisma.project.delete({
        where: {
          id: projectId,
        },
      });

      res.status(200).json(deleteProject);
    } catch (error) {
      res
        .status(403)
        .json({ error: "Error occurred while deleting a Project item." });
    }
  }
}
