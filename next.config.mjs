// import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ['localhost'],
//   },
//   env: {
//     NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//     NEXT_PUBLIC_CIVIC_CLIENT_ID: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID,
//   },
// };

// const withCivicAuth = createCivicAuthPlugin({
//   clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "4fc8c1fb-2cca-4b8a-bcb3-a9d666dd5f64",
// });

// export default withCivicAuth(nextConfig);

// // export default nextConfig;
import { createCivicAuthPlugin } from "@civic/auth/nextjs";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    NEXT_PUBLIC_CIVIC_CLIENT_ID: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID,
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "4fc8c1fb-2cca-4b8a-bcb3-a9d666dd5f64",
});

export default withCivicAuth(nextConfig);
