"use client";
import { VoiceProvider } from "@humeai/voice-react";
import { GoogleSignIn } from './auth/GoogleSignIn';
import { ExperienceRecorder } from './experiences/ExperienceRecorder';
import { useSession } from 'next-auth/react';

export default function ClientComponent({
  accessToken,
  configurationId,
}: {
  accessToken: string;
  configurationId: string;
}) {
  const { data: session, status } = useSession();

  return (
    <VoiceProvider auth={{ type: "accessToken", value: accessToken }}>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Experience Logger</h1>
            <GoogleSignIn />
          </div>
        </header>

        <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {status === 'loading' ? (
            <div className="text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          ) : session ? (
            <ExperienceRecorder accessToken={accessToken} configurationId={configurationId} />
          ) : (
            <div className="text-center">
              <p className="text-gray-600">Please sign in to record your experiences</p>
            </div>
          )}
        </div>
      </main>
    </VoiceProvider>
  );
}