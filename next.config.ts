import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d39fb8qj0fdpwj.cloudfront.net",
      },
    ],
    minimumCacheTTL: 2592000,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
};

// if (process.env.NODE_ENV === "development") {
//   await setupDevPlatform();
// }
export default nextConfig;
