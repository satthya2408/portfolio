import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  outputFileTracingRoot: root,
  // Render (and most static hosts) serve from / with no trailing slash
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
