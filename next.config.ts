import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    authInterrupts: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '1h3.googleusercontent.com'
    }]
  }
};

export default nextConfig;
