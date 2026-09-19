import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { InfinityMark } from "@/components/ui/InfinityMark";
import { GradientButton } from "@/components/ui/GradientButton";

interface AboutIntroContent {
  eyebrow: string;
  heading: string;
  body: string;
  button_label: string;
}

export function AboutIntro({ content }: { content: AboutIntroContent }) {
  return (
    <section id="about" className="bg-[#CDD5D8] py-20 md:py-28">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-16 lg:px-[80px] xl:px-[140px]">
        <Reveal>
          {/* Sora Medium */}
          <p className="text-gradient text-4xl font-medium leading-none tracking-tight md:text-5xl">{content.eyebrow}</p>
          {/* Sora Medium */}
          <h2 className="mt-7 text-2xl font-medium leading-snug tracking-tight text-navy-900 md:text-3xl">{content.heading}</h2>
          {/* Sora Regular */}
          <p className="mt-6 max-w-md text-base font-normal leading-relaxed text-[#8B9CA5] md:text-lg">{content.body}</p>
          <div className="mt-8">
            <GradientButton href="/appointment" size="md">
              {content.button_label}
            </GradientButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Same card, same oversized/tilted infinity treatment as the Hero
              left card — no shadow here, this one sits flat on the section.
              Gradient runs top-to-bottom, matching the FAQ background. */}
          <div className="relative mx-auto aspect-[0.74/1] w-full max-w-sm overflow-hidden rounded-[2rem] bg-[linear-gradient(to_bottom,#BA0A0C_0%,#9C7FA8_50%,#3E749A_100%)] md:rounded-[2.5rem]">
            <InfinityMark
              glow
              direction="vertical"
              className="absolute -left-24 -top-10 h-[200px] w-[460px] rotate-[-18deg] md:-left-28 md:-top-12 md:h-[280px] md:w-[640px] md:rotate-[-20deg]"
            />
            <Image
              src="/logo-mark.png"
              alt="Dori Solic"
              width={216}
              height={152}
              className="absolute bottom-8 right-[20px] h-[144px] w-auto [filter:brightness(0)_invert(1)] md:bottom-10 md:h-[168px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
