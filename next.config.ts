import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }, // important for GH Pages
};

export default nextConfig;
