import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // The project lives on a mechanical HDD: writing Turbopack's dev cache
    // (.next/dev/cache) took 20–40s per session and froze the laptop.
    // Dev restarts recompile from scratch instead. Re-enable on an SSD.
    turbopackFileSystemCacheForDev: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
