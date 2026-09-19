// Site-wide settings: business contact details, social links, the main
// navigation, and the footer — everything that's shared across every page
// rather than belonging to one of them. Read by the root layout (Navbar,
// Footer) and by the homepage contact section; edited as a single row in
// the admin under Site Settings.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface SocialLink {
  label: string;
  href: string;
  icon: string; // a key into the icon map in components/layout/Footer.tsx
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLink {
  group: string; // column heading, e.g. "Explore" — links are grouped by this
  label: string;
  href: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  regulatory: string;
  searchPlaceholder: string;
  navCtaLabel: string;
  navCtaHref: string;
  footerCtaEyebrow: string;
  footerCtaHeading: string;
  footerCtaButtonLabel: string;
  copyrightText: string;
  socialLinks: SocialLink[];
  mainNav: NavLink[];
  footerLinks: FooterLink[];
}

// The site's original, hand-written copy — used both as the CMS form's
// starting values and as the live fallback whenever Supabase isn't
// configured, the row is missing, or a request fails.
export const SITE_SETTINGS_DEFAULTS: SiteSettings = {
  businessName: "Dori Solic",
  tagline: "Clarity for life in the UK.",
  description:
    "Dori Solic helps you understand UK tax, benefits and immigration rules in plain English, calculate what you may be entitled to, and book professional legal help when you need it.",
  phone: "020 7946 0958",
  email: "hello@dorisolic.co.uk",
  address: "24 Chancery Lane, London, WC2A 1AB",
  hours: "Mon–Fri, 9:00am–6:00pm",
  regulatory: "[Add SRA / regulatory information]",
  searchPlaceholder: "What do you need help with?",
  navCtaLabel: "Talk to Us",
  navCtaHref: "/appointment",
  footerCtaEyebrow: "Not sure what you need?",
  footerCtaHeading: "Let's work it out.",
  footerCtaButtonLabel: "Book an appointment",
  copyrightText: "Dori Solic. All rights reserved.",
  socialLinks: [
    { label: "Facebook", href: "https://facebook.com/dorisolic", icon: "Facebook" },
    { label: "Instagram", href: "https://instagram.com/dorisolic", icon: "Instagram" },
    { label: "LinkedIn", href: "https://linkedin.com/company/dorisolic", icon: "Linkedin" },
    { label: "X", href: "https://x.com/dorisolic", icon: "Twitter" },
  ],
  mainNav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Calculators", href: "/calculators" },
    { label: "About", href: "/#about" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/#whats-new" },
    { label: "Contact", href: "/#contact" },
  ],
  footerLinks: [
    { group: "Explore", label: "Services", href: "/services" },
    { group: "Explore", label: "Calculators", href: "/calculators" },
    { group: "Explore", label: "UK Guides", href: "/guides" },
    { group: "Explore", label: "Immigration", href: "/immigration" },
    { group: "Explore", label: "Tax & Benefits", href: "/tax-and-benefits" },
    { group: "Explore", label: "FAQs", href: "/#faq" },
    { group: "Company", label: "About", href: "/#about" },
    { group: "Company", label: "Contact", href: "/#contact" },
    { group: "Company", label: "Updates", href: "/updates" },
    { group: "Company", label: "Book an Appointment", href: "/appointment" },
    { group: "Legal", label: "Privacy Policy", href: "/privacy" },
    { group: "Legal", label: "Cookie Policy", href: "/cookies" },
    { group: "Legal", label: "Terms", href: "/terms" },
    { group: "Legal", label: "Disclaimer", href: "/disclaimer" },
  ],
};

function getPublicSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function mapRow(row: any): SiteSettings {
  return {
    businessName: row.business_name || SITE_SETTINGS_DEFAULTS.businessName,
    tagline: row.tagline || SITE_SETTINGS_DEFAULTS.tagline,
    description: row.description || SITE_SETTINGS_DEFAULTS.description,
    phone: row.phone || SITE_SETTINGS_DEFAULTS.phone,
    email: row.email || SITE_SETTINGS_DEFAULTS.email,
    address: row.address || SITE_SETTINGS_DEFAULTS.address,
    hours: row.hours || SITE_SETTINGS_DEFAULTS.hours,
    regulatory: row.regulatory || SITE_SETTINGS_DEFAULTS.regulatory,
    searchPlaceholder: row.search_placeholder || SITE_SETTINGS_DEFAULTS.searchPlaceholder,
    navCtaLabel: row.nav_cta_label || SITE_SETTINGS_DEFAULTS.navCtaLabel,
    navCtaHref: row.nav_cta_href || SITE_SETTINGS_DEFAULTS.navCtaHref,
    footerCtaEyebrow: row.footer_cta_eyebrow || SITE_SETTINGS_DEFAULTS.footerCtaEyebrow,
    footerCtaHeading: row.footer_cta_heading || SITE_SETTINGS_DEFAULTS.footerCtaHeading,
    footerCtaButtonLabel: row.footer_cta_button_label || SITE_SETTINGS_DEFAULTS.footerCtaButtonLabel,
    copyrightText: row.copyright_text || SITE_SETTINGS_DEFAULTS.copyrightText,
    socialLinks: Array.isArray(row.social_links) && row.social_links.length > 0 ? row.social_links : SITE_SETTINGS_DEFAULTS.socialLinks,
    mainNav: Array.isArray(row.main_nav) && row.main_nav.length > 0 ? row.main_nav : SITE_SETTINGS_DEFAULTS.mainNav,
    footerLinks: Array.isArray(row.footer_links) && row.footer_links.length > 0 ? row.footer_links : SITE_SETTINGS_DEFAULTS.footerLinks,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("site_settings").select("*").eq("id", "default").maybeSingle();
    if (!error && data) return mapRow(data);
  }
  return SITE_SETTINGS_DEFAULTS;
}
