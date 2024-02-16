import path from "path";
import { fileURLToPath } from "url";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/utils/i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(fileURLToPath(import.meta.url), "styles")],
  },
};

export default withNextIntl(nextConfig);
