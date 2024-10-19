// app/api/hume_token/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { fetchAccessToken } from "../../lib/humeAI"

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    try {
      const accessToken = await fetchAccessToken();
      return NextResponse.json({ accessToken });
    } catch (error) {
      // Check if error is an instance of Error to access the message
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Failed to fetch Hume access token", error);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
