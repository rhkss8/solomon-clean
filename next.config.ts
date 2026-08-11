import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blogthumb.pstatic.net" },
      { protocol: "https", hostname: "blogpfthumb.phinf.naver.net" },
    ],
  },
};

export default nextConfig;
