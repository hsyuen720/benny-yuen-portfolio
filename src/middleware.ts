import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { Languages } from "~/settings/i18n";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: Object.values(Languages),
  // Used when no locale matches
  defaultLocale: Languages.English,
  localePrefix: "as-needed",
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Detect country from Vercel edge header
  const country = request.headers.get("x-vercel-ip-country") || "HK";

  // Add country to response headers so it can be read server-side
  response.headers.set("x-user-country", country);

  return response;
}

export const config = {
  // Match only internationalized pathnames, exclude API routes
  matcher: ["/", "/(en|zh)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
