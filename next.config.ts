import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

module.exports = {
  async redirects() {
    return [];
  },
  experimental: {
    middlewarePrefetch: "flexible",
  },
};

export default nextConfig;
