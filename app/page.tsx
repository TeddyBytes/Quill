// app/page.tsx
import { fetchAccessToken } from "hume";
import ClientComponent from "@/components/ClientComponent";

export default async function Page() {
  try {
    const accessToken = await fetchAccessToken({
      apiKey: process.env.HUME_API_KEY!,
      secretKey: process.env.HUME_SECRET_KEY!,
    });

    if (!accessToken) {
      throw new Error("Access token is null or undefined");
    }

    return <ClientComponent accessToken={accessToken} configurationId={process.env.HUME_CLIENT_SECRET!} />;
  } catch (error) {
    console.error("Error fetching Hume access token:", error);
    return <div>Error: Failed to initialize. Please check your environment variables and try again.</div>;
  }
}