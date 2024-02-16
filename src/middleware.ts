import createMiddleware from "next-intl/middleware";

import { Languages } from "~/settings/i18n";

export default createMiddleware({
  locales: Object.values(Languages),
  defaultLocale: Languages.English,
});

export const config = {
  matcher: ["/", "/(en|zh)/:path*"],
};
