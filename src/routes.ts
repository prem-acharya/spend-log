import { pathToRegexp } from "path-to-regexp";

export const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/api/auth/(.)*", // All auth API routes
];

export const authRoutes = ["/login", "/signup"];

export const protectedRoutes = [
  "/dashboard",
  "/dashboard/(.*)", // All dashboard sub-routes
  "/api/(.)*", // All API routes except auth
];

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export function isPublicRoute(path: string) {
  return publicRoutes.some((route) => pathToRegexp(route).regexp.test(path));
}

export function isAuthRoute(path: string) {
  return authRoutes.some((route) => pathToRegexp(route).regexp.test(path));
}

export function isProtectedRoute(path: string) {
  return protectedRoutes.some((route) => pathToRegexp(route).regexp.test(path));
}
