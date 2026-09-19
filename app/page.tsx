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
import { getPageContent } from "@/lib/cms/page-content";
import { getSiteSettings } from "@/lib/cms/site-settings";

export const revalidate = 60;

export default async function HomePage() {
  const [heroSlides, updates, guides, faqs, testimonials, videoTestimonials, services, content, settings] = await Promise.all([
    getHeroSlides(),
    getUpdates(),
    getGuides(),
    getFaqs(),
    getTestimonials(),
    getVideoTestimonials(),
    getServices(),
    getPageContent("home"),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <WhatsNewIntro updates={updates} content={content["whats-new-intro"] as any} />
      <LifeMoments content={content["life-moments"] as any} />
      <AboutIntro content={content["about"] as any} />
      <PopularCalculators content={content["popular-calculators"] as any} />
      <ImmigrationTaxSplit content={content["immigration-tax-split"] as any} />
      <RealQuestions faqs={faqs} content={content["real-questions"] as any} />
      <GuidesPreview guides={guides} content={content["guides-preview"] as any} />
      <WhyDoriSolic content={content["why-dori-solic"] as any} />
      <Testimonials testimonials={testimonials} content={content["testimonials"] as any} />
      <VideoTestimonials testimonials={videoTestimonials} content={content["video-testimonials"] as any} />
      <FeaturedServices services={services} content={content["featured-services"] as any} />
      <FAQPreview faqs={faqs} content={content["faq-preview"] as any} />
      <HomeContact settings={settings} content={content["home-contact"] as any} />
    </>
  );
}
