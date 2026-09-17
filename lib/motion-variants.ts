// Shared Framer Motion variants used across the site so the same gesture
// always reads the same way wherever it shows up.

// A slot-machine-reel transition: the outgoing content keeps scrolling down
// and out of view while the incoming content scrolls down from above into
// the same spot — one continuous downward motion, not a fade or a hinge.
// Used by the home page's "See What's New" card and the blog page's
// auto-cycling sidebar card.
export const scrollVariants = {
  initial: { y: "-100%" },
  animate: { y: "0%" },
  exit: { y: "100%" },
};
