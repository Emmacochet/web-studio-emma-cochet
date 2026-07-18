import type { NextConfig } from "next";

const repoName = "web-studio-emma-cochet";
const basePath = process.env.GITHUB_ACTIONS ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.102"],
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
  output: "export",
  basePath,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
