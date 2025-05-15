import { authMiddleware } from "@civic/auth-web3/nextjs/middleware";

export default authMiddleware();

export const config = {
  // include the paths you wish to secure here
  matcher: [
    // Protected routes that require authentication
    "/practice",
    "/feedback",
    "/analysis",
    "/questions",
    "/filter",
    // API routes
    "/api/interview/:path*",
  ],
};
