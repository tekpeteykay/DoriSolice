export const siteConfig = {
  name: "Dori Solic",
  tagline: "Clarity for life in the UK.",
  description:
    "Dori Solic helps you understand UK tax, benefits and immigration rules in plain English, calculate what you may be entitled to, and book professional legal help when you need it.",
  url: "https://www.dorisolic.example",
  phone: "020 7946 0958",
  email: "hello@dorisolic.co.uk",
  address: "24 Chancery Lane, London, WC2A 1AB",
  hours: "Mon–Fri, 9:00am–6:00pm",
  regulatory: "[Add SRA / regulatory information]",
};

// Placeholder social links — swap the hrefs for the real profiles later.
export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/dorisolic", icon: "Facebook" },
  { label: "Instagram", href: "https://instagram.com/dorisolic", icon: "Instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/company/dorisolic", icon: "Linkedin" },
  { label: "X", href: "https://x.com/dorisolic", icon: "Twitter" },
] as const;

// Every entry except Services/Calculators points at a section on the home
// page rather than a standalone route — clicking always lands you on that
// section there, and only a CTA or link inside the section (e.g. "Book an
// appointment", or a specific update's own page) goes any deeper.
export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Calculators", href: "/calculators" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Blog", href: "/#whats-new" },
  { label: "Contact", href: "/#contact" },
];

export const footerNav = {
  Explore: [
    { label: "Services", href: "/services" },
    { label: "Calculators", href: "/calculators" },
    { label: "UK Guides", href: "/guides" },
    { label: "Immigration", href: "/immigration" },
    { label: "Tax & Benefits", href: "/tax-and-benefits" },
    { label: "FAQs", href: "/#faq" },
  ],
  Company: [
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
    { label: "Updates", href: "/updates" },
    { label: "Book an Appointment", href: "/appointment" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Terms", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
