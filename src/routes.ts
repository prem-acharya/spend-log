/**
 * Routes that are accessible to the public
 * These routes do not require authentication
 */
export const publicRoutes = ["/"];

/**
 * Routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 */
export const authRoutes = ["/login", "/signup"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
