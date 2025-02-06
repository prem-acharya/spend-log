"use client";

import { createContext, useContext, useMemo } from "react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string | null;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const value = useMemo(
    () => ({
      isLoading: status === "loading",
      isAuthenticated: status === "authenticated",
      user:
        session?.user && session.user.id
          ? {
              id: session.user.id,
              name: session.user.name ?? null,
              email: session.user.email!,
            }
          : null,
    }),
    [session, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
