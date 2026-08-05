import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/reviews", destination: "/portfolio", permanent: true }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blogthumb.pstatic.net" },
      { protocol: "https", hostname: "blogpfthumb.phinf.naver.net" },
    ],
  },
};

export default nextConfig;
