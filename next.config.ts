import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // untuk deploy dengan PM2
  reactStrictMode: true,
  experimental: {
    middlewarePrefetch: "flexible",
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.yhusan-digital.com",
      },
    ],
  },
  compiler: {
    // Remove console logs only in production, excluding error logs
    removeConsole:
      process.env.NEXT_PUBLIC_PRODUCTION ? { exclude: ["error"] } : false,
      // process.env.NEXT_PUBLIC_PRODUCTION ? false : { exclude: ["error"] },
  },
  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
