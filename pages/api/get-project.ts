// Import necessary modules
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Define the API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the domain from the query parameters
  const { domain } = req.query;

  try {
    // Check if the domain is provided
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
      key: projectDetails.apiKey,
    });
  } catch (error) {
    res
      .status(403)
      .json({ error: "Error occurred while fetching project details." });
  }
}
