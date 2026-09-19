import { MetadataRoute } from "next";
import { calculators } from "@/lib/calculators/registry";
import { siteConfig } from "@/lib/site-config";
import { getGuides, getServices } from "@/lib/cms/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const [guides, services] = await Promise.all([getGuides(), getServices()]);

  const staticRoutes = [
    "",
    "/services",
    "/calculators",
    "/guides",
    "/immigration",
    "/tax-and-benefits",
    "/updates",
    "/appointment",
    "/what-do-i-need",
    "/privacy",
    "/cookies",
    "/terms",
    "/disclaimer",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));

  const guideRoutes = guides.map((g) => ({
    url: `${base}/guides/${g.category}/${g.slug}`,
    lastModified: g.lastReviewed,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.category}/${s.slug}`,
    lastModified: new Date(),
  }));

  const calculatorRoutes = calculators.map((c) => ({
    url: `${base}/calculators/${c.slug}`,
    lastModified: c.lastUpdated,
  }));

  return [...staticRoutes, ...guideRoutes, ...serviceRoutes, ...calculatorRoutes];
}
