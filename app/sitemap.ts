import { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { services } from "@/data/services";
import { calculators } from "@/lib/calculators/registry";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

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
