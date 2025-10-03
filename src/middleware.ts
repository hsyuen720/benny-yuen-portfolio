import createMiddleware from "next-intl/middleware";

import { Languages } from "~/settings/i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales: Object.values(Languages),
  // Used when no locale matches
  defaultLocale: Languages.English,
  localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames, exclude API routes
  matcher: ["/", "/(en|zh)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
