import { useCallback } from "react";
import { useAuth } from "@/app/context/AuthProvider";
import { getUserByEmail } from "@/data/user";

export function useUser() {
  const { user } = useAuth();

  const refreshUserData = useCallback(async () => {
    if (!user?.email) return null;
    return await getUserByEmail(user.email);
  }, [user?.email]);

  return {
    user,
    refreshUserData,
  };
}
