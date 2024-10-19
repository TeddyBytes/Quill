// app/lib/humeAI.ts

import axios from 'axios';

export async function fetchAccessToken(): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_HUME_API_KEY;
  const clientId = process.env.HUME_CLIENT_ID;
  const clientSecret = process.env.HUME_CLIENT_SECRET;

  if (!apiKey || !clientId || !clientSecret) {
    throw new Error('Hume API key, client ID, or client secret is missing');
  }

  try {
    const response = await axios.post('https://api.hume.ai/v0/auth/token', {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-Hume-Api-Key': apiKey
      }
    });

    if (response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error('Failed to retrieve access token from Hume API response');
    }
  } catch (error: any) { // Assert the error as 'any'
    console.error('Error fetching Hume access token:', error);
    throw new Error('Failed to fetch Hume access token: ' + (error.response?.data?.message || error.message));
  }
}
