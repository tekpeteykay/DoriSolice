// Maps a saved/deleted CMS row to the public-facing paths that show its
// content, so the admin can ask Next.js to refresh exactly those pages
// after a write — see app/api/revalidate/route.ts and its callers in
// components/admin/cms/ResourceForm.tsx and ResourceList.tsx.
export function getPublicPaths(resourceKey: string, row: Record<string, unknown> | null | undefined): string[] {
  const slug = row?.slug as string | undefined;
  const category = row?.category as string | undefined;

  switch (resourceKey) {
    case "services":
      return ["/", "/services", ...(slug && category ? [`/services/${category}/${slug}`] : []), "/immigration", "/tax-and-benefits"];
    case "guides":
      return ["/", "/guides", ...(slug && category ? [`/guides/${category}/${slug}`] : []), "/immigration", "/tax-and-benefits"];
    case "faqs":
      return ["/"];
    case "testimonials":
      return ["/"];
    case "video_testimonials":
      return ["/"];
    case "updates":
      return ["/", "/blog", "/updates"];
    case "hero_slides":
      return ["/"];
    case "appointment_types":
      return ["/appointment"];
    default:
      return ["/"];
  }
}
