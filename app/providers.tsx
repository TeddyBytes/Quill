// app/providers.tsx
"use client"; // This needs to be a client component

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}
