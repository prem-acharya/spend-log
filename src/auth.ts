import { getServerSession } from "next-auth/next";
import authConfig from "./auth.config";

// Use getServerSession to retrieve the session on the server.
export const auth = () => getServerSession(authConfig);
