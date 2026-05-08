import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb"
    }
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ourdailybreadhub.com" }],
        destination: "https://nextfaithfulstep.com/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ourdailybreadhub.com" }],
        destination: "https://nextfaithfulstep.com/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
