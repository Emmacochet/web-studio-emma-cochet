import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.102"],
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
