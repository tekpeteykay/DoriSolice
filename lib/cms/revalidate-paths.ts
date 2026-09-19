export interface RevalidateTarget {
  path: string;
  /** "layout" invalidates every page under that path's layout — used for
   * site-wide settings (nav/footer) since they're rendered in the root
   * layout, not any one page. Defaults to "page" (just that one URL). */
  type?: "layout" | "page";
}

export function getPublicPaths(resourceKey: string, row: Record<string, unknown> | null | undefined): RevalidateTarget[] {
  const slug = row?.slug as string | undefined;
  const category = row?.category as string | undefined;
  switch (resourceKey) {
    case "services":
      return [{ path: "/" }, { path: "/services" }, ...(slug && category ? [{ path: `/services/${category}/${slug}` }] : []), { path: "/immigration" }, { path: "/tax-and-benefits" }];
    case "guides":
      return [{ path: "/" }, { path: "/guides" }, ...(slug && category ? [{ path: `/guides/${category}/${slug}` }] : []), { path: "/immigration" }, { path: "/tax-and-benefits" }];
    case "faqs":
      return [{ path: "/" }];
    case "testimonials":
      return [{ path: "/" }];
    case "video_testimonials":
      return [{ path: "/" }];
    case "updates":
      return [{ path: "/" }, { path: "/blog" }, { path: "/updates" }];
    case "hero_slides":
      return [{ path: "/" }];
    case "appointment_types":
      return [{ path: "/appointment" }];
    case "site_settings":
      // Nav and footer render in the root layout, which wraps every page —
      // "layout" revalidation is what actually reaches all of them.
      return [{ path: "/", type: "layout" }];
    default:
      return [{ path: "/" }];
  }
}
