// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      bcrypt: 'commonjs bcrypt', // This prevents it from being bundled
    };
    return config;
  },
};

export default nextConfig;