// Hero carousel content. Swap the `image` path for your own photography at
// any time — drop a same-name file into /public/hero-slides/ or update the
// path here. Everything else (headline, subtext, CTA) is plain data.
export interface HeroSlide {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

export const heroSlides: HeroSlide[] = [
  {
    title: "British Passport Application",
    subtitle: "Get it done right without the hassle and the mistakes.",
    ctaLabel: "Book a Call",
    ctaHref: "/appointment",
    image: "/hero-slides/slide-1-passport.jpg",
  },
  {
    title: "Skilled Worker Visa",
    subtitle: "Bring your job offer to life without the paperwork headache.",
    ctaLabel: "Book a Call",
    ctaHref: "/appointment",
    image: "/hero-slides/slide-2-skilled-worker.jpg",
  },
  {
    title: "Know Your Take-Home Pay",
    subtitle: "See exactly what lands in your account before you accept.",
    ctaLabel: "Book a Call",
    ctaHref: "/appointment",
    image: "/hero-slides/slide-3-take-home-pay.jpg",
  },
  {
    title: "Spouse & Partner Visa",
    subtitle: "Bring the people you love to the UK, the right way.",
    ctaLabel: "Book a Call",
    ctaHref: "/appointment",
    image: "/hero-slides/slide-4-spouse-visa.png",
  },
];
