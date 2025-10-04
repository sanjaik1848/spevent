import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  // For MilesWeb deployment - use static export
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Disable API routes for static export
  async rewrites() {
    return [];
  }
};

export default nextConfig;