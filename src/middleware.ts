import { NextRequest, NextResponse } from "next/server";
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

  const country = request.headers.get("x-vercel-ip-country") || "HK";

  const modifiedResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (response) {
    response.headers.forEach((value, key) => {
      modifiedResponse.headers.set(key, value);
    });
  }

  modifiedResponse.headers.set("x-user-country", country);

  return modifiedResponse;
}

export const config = {
  // Match only internationalized pathnames, exclude API routes
  matcher: ["/", "/(en|zh)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
