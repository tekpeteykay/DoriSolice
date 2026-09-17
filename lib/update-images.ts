import { updates } from "@/data/updates";

// One image per update, matched by position — SiteUpdate has no image field
// of its own, so this stays a shared lookup rather than something duplicated
// wherever an update needs a picture (home's "See What's New" card, the
// blog page's article and sidebar).
export const UPDATE_IMAGES = [
  "/hero-slides/slide-4-spouse-visa.png",
  "/hero-slides/slide-2-skilled-worker.jpg",
  "/hero-slides/slide-3-take-home-pay.jpg",
  "/hero-slides/slide-1-passport.jpg",
];

export function getUpdateImage(slug: string): string {
  const index = updates.findIndex((u) => u.slug === slug);
  if (index < 0) return UPDATE_IMAGES[0];
  return UPDATE_IMAGES[index % UPDATE_IMAGES.length];
}
