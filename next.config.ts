import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      bcrypt: 'commonjs bcrypt', // 🛡 prevent build from bundling bcrypt
    };
    return config;
  },
};

export default nextConfig;