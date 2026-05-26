import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],

  webpack: (config) => {
    config.watchOptions = {
      ignored: ["**/node_modules", "**/.next", "**/System Volume Information"],
    };

    return config;
  },
};

export default nextConfig;

// const nextConfig = {
//   serverExternalPackages: ["@prisma/client"],
// };

// export default nextConfig;
