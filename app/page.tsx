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
import { getHeroSlides, getUpdates, getGuides, getFaqs, getTestimonials, getVideoTestimonials, getServices } from "@/lib/cms/queries";

// Content here comes from the CMS — re-check it periodically, and the admin
// panel also asks for an immediate refresh right after a save (see
// app/api/revalidate/route.ts), so this window is really just a fallback.
export const revalidate = 60;

export default async function HomePage() {
  const [heroSlides, updates, guides, faqs, testimonials, videoTestimonials, services] = await Promise.all([
    getHeroSlides(),
    getUpdates(),
    getGuides(),
    getFaqs(),
    getTestimonials(),
    getVideoTestimonials(),
    getServices(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <WhatsNewIntro updates={updates} />
      <LifeMoments />
      <AboutIntro />
      <PopularCalculators />
      <ImmigrationTaxSplit />
      <RealQuestions faqs={faqs} />
      <GuidesPreview guides={guides} />
      <WhyDoriSolic />
      <Testimonials testimonials={testimonials} />
      <VideoTestimonials testimonials={videoTestimonials} />
      <FeaturedServices services={services} />
      <FAQPreview faqs={faqs} />
      <HomeContact />
    </>
  );
}
