"use client";

import { useSession } from "next-auth/react";

export function SessionCheck() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading session...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        Authenticated as: {session.user?.name} ({session.user?.email})
      </div>
    );
  }

  return <div>Not authenticated</div>;
}
