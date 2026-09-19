// One image per update, matched deterministically by slug — SiteUpdate can
// optionally carry its own imageUrl from the CMS, and this is the fallback
// used whenever that's unset. Hash-based (rather than array position) so it
// stays stable regardless of how many updates exist or what order the
// database returns them in.
export const UPDATE_IMAGES = [
  "/hero-slides/slide-4-spouse-visa.png",
  "/hero-slides/slide-2-skilled-worker.jpg",
  "/hero-slides/slide-3-take-home-pay.jpg",
  "/hero-slides/slide-1-passport.jpg",
];

export function getUpdateImage(slug: string): string {
  if (!slug) return UPDATE_IMAGES[0];
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return UPDATE_IMAGES[hash % UPDATE_IMAGES.length];
}
