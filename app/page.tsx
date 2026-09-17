import { Hero } from "@/components/home/Hero";
import { WhatsNewIntro } from "@/components/home/WhatsNewIntro";
import { LifeMoments } from "@/components/home/LifeMoments";
import { AboutIntro } from "@/components/home/AboutIntro";
import { PopularCalculators } from "@/components/home/PopularCalculators";
import { ImmigrationTaxSplit } from "@/components/home/ImmigrationTaxSplit";
import { RealQuestions } from "@/components/home/RealQuestions";
import { GuidesPreview } from "@/components/home/GuidesPreview";
import { WhyDoriSolic } from "@/components/home/WhyDoriSolic";
import { Testimonials } from "@/components/home/Testimonials";
import { VideoTestimonials } from "@/components/home/VideoTestimonials";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { FAQPreview } from "@/components/home/FAQPreview";
import { HomeContact } from "@/components/home/HomeContact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatsNewIntro />
      <LifeMoments />
      <AboutIntro />
      <PopularCalculators />
      <ImmigrationTaxSplit />
      <RealQuestions />
      <GuidesPreview />
      <WhyDoriSolic />
      <Testimonials />
      <VideoTestimonials />
      <FeaturedServices />
      <FAQPreview />
      <HomeContact />
    </>
  );
}
