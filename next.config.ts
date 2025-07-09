import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**' // Adjust this to match the path structure in your URLs
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/addblog',
        permanent: true
      }
    ]
  }
};

export default nextConfig;
