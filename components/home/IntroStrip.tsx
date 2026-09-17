import { Reveal } from "@/components/ui/Reveal";

export function IntroStrip() {
  return (
    <section className="bg-white pb-4 pt-14">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-navy-600 md:text-xl">
            Hi, we&rsquo;re Dori Solic. We think most people don&rsquo;t need a lecture in legal jargon &mdash; they just want to know{" "}
            <span className="font-semibold text-navy-900">where they stand</span>. So that&rsquo;s where we start: plain answers, real numbers, and a friendly
            face when you&rsquo;re ready for one.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
