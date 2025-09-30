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
  // Enable static export for deployment
  trailingSlash: true,
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'out'
  })
};

export default nextConfig;