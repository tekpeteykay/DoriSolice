import type { Metadata } from "next";
import "@fontsource/sora/300.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site-config";
import { getServices } from "@/lib/cms/queries";
import { getSiteSettings } from "@/lib/cms/site-settings";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${settings.businessName} — ${settings.tagline}`,
      template: `%s | ${settings.businessName}`,
    },
    description: settings.description,
    openGraph: {
      title: settings.businessName,
      description: settings.description,
      siteName: settings.businessName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.businessName,
      description: settings.description,
    },
    icons: {
      icon: "/logo-mark.png",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [services, settings] = await Promise.all([getServices(), getSiteSettings()]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: settings.businessName,
            description: settings.description,
            url: siteConfig.url,
            areaServed: "GB",
          }}
        />
        <Navbar services={services} settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        <CookieConsent />
      </body>
    </html>
  );
}
