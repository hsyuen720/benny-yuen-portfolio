import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import createNextIntlPlugin from "next-intl/plugin";

const withVanillaExtract = createVanillaExtractPlugin();
const withNextIntl = createNextIntlPlugin("./src/utils/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: `/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/*`,
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression
  compress: true,

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Enable modern JS features and optimize imports
  modularizeImports: {
    "react-icons/fa": {
      transform: "react-icons/fa/{{member}}",
    },
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
  },

  // Add performance optimizations
  experimental: {
    optimizePackageImports: ["react-icons", "luxon", "next-intl", "clsx"],
    scrollRestoration: true,
  },

  // External packages for server components
  serverExternalPackages: [
    "firebase-admin",
    "firebase",
    "@firebase/app",
    "@firebase/firestore",
    "@firebase/storage",
  ],

  // Enable webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Split common chunks to reduce initial bundle
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "commons",
            priority: 5,
            reuseExistingChunk: true,
            minChunks: 2,
          },
        },
      };

      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
      };
    }

    return config;
  },
};

export default withVanillaExtract(withNextIntl(nextConfig));
