import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'z6ubkv3oaqzyvcai.public.blob.vercel-storage.com',
        pathname: '/**' // Adjust this to match the path structure in your URLs
      }
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/admin',
  //       destination: '/admin/addblog',
  //       permanent: false
  //     }
  //   ]
  // }
};

export default nextConfig;
