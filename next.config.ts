import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      {
        source: '/', // the URL you want in browser
        destination: '/pos', // default to POS
      },
    ];
  },


};

export default nextConfig;
