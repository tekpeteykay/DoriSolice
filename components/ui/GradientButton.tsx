"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  // Opt-in: instead of the default hover-only nudge, the icon drifts left-to-right
  // and back in a continuous, subtle loop. Used sparingly on specific buttons.
  animatedIcon?: boolean;
}

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className">)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">)
  );

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
  lg: "px-8 py-4 text-base md:text-lg",
};

export function GradientButton({
  children,
  className,
  variant = "solid",
  size = "md",
  icon = true,
  animatedIcon = false,
  href,
  ...props
}: ButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    sizeClasses[size],
    variant === "solid" && "bg-brand-gradient bg-[length:200%_auto] text-white shadow-glow hover:bg-[position:100%_0] hover:-translate-y-0.5 active:translate-y-0",
    variant === "outline" && "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
    variant === "ghost" && "text-navy-700 hover:text-navy-900 hover:bg-navy-50",
    variant === "dark" && "bg-navy-900 text-white hover:bg-navy-800",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon &&
        (animatedIcon ? (
          <motion.span
            className="inline-flex shrink-0"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        ))}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={base} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={base} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
