import path from "path";
import { fileURLToPath } from "url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(fileURLToPath(import.meta.url), "styles")],
  },
};

export default nextConfig;
