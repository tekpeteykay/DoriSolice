import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1180px",
        "2xl": "1320px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
      },
      colors: {
        // Core Dori Solic brand tokens, derived from the reference brand image.
        navy: {
          DEFAULT: "#00385A",
          50: "#EAF1F5",
          100: "#CBDEE8",
          200: "#9DBECF",
          300: "#6E9EB7",
          400: "#3E749A",
          500: "#00385A", // primary deep navy
          600: "#012F4C",
          700: "#02253C",
          800: "#031B2C",
          900: "#032236", // dark navy (near-black canvas)
          950: "#020F1A",
        },
        slate: {
          DEFAULT: "#7697AA",
          50: "#F3F6F8",
          100: "#E4EBEF",
          200: "#C7D6DE",
          300: "#A9C0CD",
          400: "#8CA9BB",
          500: "#7697AA", // secondary slate blue
          600: "#5D7C8F",
          700: "#476175",
          800: "#32475A",
          900: "#1E2E3C",
        },
        red: {
          DEFAULT: "#BA0A0C",
          50: "#FDECEC",
          100: "#FAD0D0",
          200: "#F2A2A2",
          300: "#E67374",
          400: "#D3403F",
          500: "#BA0A0C", // accent red
          600: "#9C0709",
          700: "#7D0608",
          800: "#5E0405",
          900: "#3F0303",
        },
        lilac: {
          DEFAULT: "#9C7FA8",
          400: "#B79BC4",
          500: "#9C7FA8",
          600: "#7E6389",
        },
        ink: "#032236",
        paper: "#FFFFFF",
        surface: {
          light: "#F5F8FA",
          dark: "#062F49",
        },
      },
      backgroundImage: {
        // Corner-to-corner diagonal (red top-left to blue bottom-right) — the
        // single shared direction every gradient icon, button and card-hover
        // overlay on the site uses. "to bottom right" (rather than a fixed
        // deg value) is deliberate: it always hits the exact opposite
        // corners regardless of the element's aspect ratio, which is what
        // the reference art actually does — a fixed angle like 135deg only
        // looks right on a square and drifts off-corner on portrait/wide
        // shapes (verified by sampling the brand reference image).
        "brand-gradient": "linear-gradient(to bottom right, #BA0A0C 0%, #9C7FA8 50%, #3E749A 100%)",
        "brand-gradient-soft": "linear-gradient(to bottom right, rgba(186,10,12,0.9) 0%, rgba(156,127,168,0.85) 45%, rgba(62,116,154,0.9) 100%)",
        "brand-radial": "radial-gradient(120% 120% at 10% 0%, #02253C 0%, #032236 55%, #020F1A 100%)",
        "hero-grid": "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(186,10,12,0.35)",
        card: "0 1px 2px rgba(3,34,54,0.06), 0 8px 24px -8px rgba(3,34,54,0.12)",
        "card-dark": "0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 50px -20px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "gradient-x": "gradient-x 6s ease infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
