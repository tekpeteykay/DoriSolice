import Link from "next/link";
import Image from "next/image";
import { footerNav, siteConfig, socialLinks } from "@/lib/site-config";
import { GradientButton } from "@/components/ui/GradientButton";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const socialIcons = { Facebook, Instagram, Linkedin, Twitter };

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="border-b border-white/10">
        <div className="container flex flex-col items-center gap-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-400">Not sure what you need?</p>
          <h2 className="max-w-xl text-3xl font-bold text-white md:text-4xl">Let&rsquo;s work it out.</h2>
          <GradientButton href="/appointment" size="lg">
            Book an appointment
          </GradientButton>
        </div>
      </div>

      <div className="container grid grid-cols-2 gap-10 py-14 md:grid-cols-5">
        <div className="col-span-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo-mark.png" alt="Dori Solic" width={216} height={152} className="h-14 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{siteConfig.description}</p>
          <p className="mt-4 text-sm">{siteConfig.regulatory}</p>

          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.icon as keyof typeof socialIcons];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient bg-[length:200%_auto] text-white shadow-glow transition-all duration-300 hover:bg-[position:100%_0] hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>
        </div>

        {Object.entries(footerNav).map(([heading, links]) => (
          <div key={heading}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-white/40">{heading}</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Dori Solic. All rights reserved.</p>
        <p>{siteConfig.regulatory}</p>
      </div>
    </footer>
  );
}
