import createMiddleware from "next-intl/middleware";

import { Languages } from "~/settings/constants";

const locales = Object.values(Languages);

export default createMiddleware({
  locales,
  defaultLocale: Languages.English,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|zh)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
