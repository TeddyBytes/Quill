// app/lib/database.ts
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient
const prisma = new PrismaClient();

// Define the type for responses
type Response = {
  question: string;
  answer: string;
  analysis?: any;
};

export const saveExperience = async (userId: string, category: string, responses: Response[]) => {
  try {
    const experience = await prisma.experience.create({
      data: {
        userId,
        category,
        responses: JSON.stringify(responses), // Convert responses to a JSON string
      },
    });
    return experience.id; // Return the ID of the created experience
  } catch (error) {
    console.error('Error saving experience:', error);
    throw new Error('Failed to save experience');
  }
};

// Function to get experiences for a user
export const getExperiencesForUser = async (userId: string) => {
  try {
    const experiences = await prisma.experience.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return experiences.map(exp => ({
      ...exp,
      responses: JSON.parse(exp.responses as string), // Parse the JSON string back to an object
    }));
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw new Error('Failed to fetch experiences');
  }
};

// Ensure PrismaClient is properly closed when the app shuts down
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});