import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   images: {
// //     remotePatterns: [
// //       {
// //         protocol: "https",
// //         hostname: "source.unsplash.com",
// //       },
// //     ],
// //   },
// // };

// // export default nextConfig;

// // // import type { NextConfig } from "next";

// // // const nextConfig: NextConfig = {
// // //   serverExternalPackages: ["@prisma/client"],

// // //   webpack: (config) => {
// // //     config.watchOptions = {
// // //       ignored: ["**/node_modules", "**/.next", "**/System Volume Information"],
// // //     };

// // //     return config;
// // //   },
// // // };

// // // export default nextConfig;

// // // // const nextConfig = {
// // // //   serverExternalPackages: ["@prisma/client"],
// // // // };

// // // // export default nextConfig;
