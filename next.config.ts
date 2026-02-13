import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/valentines',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
