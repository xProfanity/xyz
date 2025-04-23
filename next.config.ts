import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SANITY_PROJECT_TOKEN: process.env.SANITY_PROJECT_TOKEN,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID
  }
};

export default nextConfig;
