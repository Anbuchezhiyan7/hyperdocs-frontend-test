import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    // Cache the RSC payload for dynamic routes in the client-side router cache.
    // Without this, every sidebar click triggers a full server round-trip (~700ms-1s in production).
    // With loading.tsx present in [...slug], the shell is prefetched and the payload is cached for 30s.
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
