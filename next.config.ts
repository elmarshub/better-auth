import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
