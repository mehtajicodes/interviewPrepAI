import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "4fc8c1fb-2cca-4b8a-bcb3-a9d666dd5f64",
});

export default withCivicAuth(nextConfig);

// export default nextConfig;
