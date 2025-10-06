import { MetadataRoute } from "next";

import { Languages } from "~/settings/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

  const routes = ["/"]; // Only index route
  const locales = Object.values(Languages);

  const sitemap: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      const url = `${baseUrl}${locale === Languages.English ? "" : `/${locale}`}${route === "/" ? "" : route}`;

      // Create alternates object for i18n
      const alternates: Record<string, string> = {};
      locales.forEach((altLocale) => {
        const altUrl = `${baseUrl}${altLocale === Languages.English ? "" : `/${altLocale}`}${route === "/" ? "" : route}`;
        alternates[altLocale] = altUrl;
      });

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1, // Max priority for home page
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemap;
}
