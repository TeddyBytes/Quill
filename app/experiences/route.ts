// app/api/experiences/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { saveExperience } from '@/lib/database'; // Updated import path

export async function POST(request: Request) {
  const session = await getServerSession(); // Get session data
  
  // Check if the user is authenticated
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json(); // Parse the request body
  
  try {
    // Save the experience using the saveExperience function
    const id = await saveExperience(
      session.user.id, // Get user ID from session
      body.category,   // Category from request body
      body.responses   // Responses from request body
    );
    
    return NextResponse.json({ id }); // Respond with the ID of the saved experience
  } catch (error) {
    console.error('Error saving experience:', error);
    return NextResponse.json({ error: 'Failed to save experience' }, { status: 500 });
  }
}