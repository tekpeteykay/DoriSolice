// Server-side read layer for public pages. Each function tries Supabase
// first (the live CMS data) and falls back to the original static /data
// file if Supabase isn't configured or the request fails — so the site
// degrades gracefully instead of 500ing if the database is unreachable.
//
// Every function returns the exact same shape the static data files always
// exported, so components that consume this data don't need to know or
// care whether it came from the database or from code.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ServiceItem, Guide, FAQ, SiteUpdate } from "@/types";
import type { HeroSlide } from "@/data/hero-slides";
import type { Testimonial } from "@/data/testimonials";
import type { VideoTestimonial } from "@/data/video-testimonials";
import type { AppointmentTypeDef } from "@/types";

import { services as staticServices, getServiceBySlug as staticGetServiceBySlug } from "@/data/services";
import { guides as staticGuides, getGuideBySlug as staticGetGuideBySlug } from "@/data/guides";
import { faqs as staticFaqs } from "@/data/faqs";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import { videoTestimonials as staticVideoTestimonials } from "@/data/video-testimonials";
import { updates as staticUpdates } from "@/data/updates";
import { heroSlides as staticHeroSlides } from "@/data/hero-slides";
import { appointmentTypes as staticAppointmentTypes } from "@/data/appointment-types";

function getPublicSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  // No cookie handling needed — these are anonymous, public reads governed
  // by the "Public can read ..." RLS policies in supabase/schema.sql, safe
  // to call from anywhere (Server Components, generateStaticParams,
  // sitemap.ts) without a request-scoped context.
  return createClient(url, key, { auth: { persistSession: false } });
}

// ---------------------------------------------------------------------------
// services
// ---------------------------------------------------------------------------
function mapServiceRow(row: any): ServiceItem {
  return {
    slug: row.slug,
    category: row.category,
    title: row.title,
    shortDescription: row.short_description,
    problemStatement: row.problem_statement,
    whoItsFor: row.who_its_for ?? [],
    whatWeHelpWith: row.what_we_help_with ?? [],
    process: row.process ?? [],
    documentsNeeded: row.documents_needed ?? [],
    typicalQuestions: row.typical_questions ?? [],
    relatedCalculators: row.related_calculators ?? [],
    relatedGuides: row.related_guides ?? [],
  };
}

export async function getServices(): Promise<ServiceItem[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data.map(mapServiceRow);
  }
  return staticServices;
}

export async function getServiceBySlug(slug: string): Promise<ServiceItem | undefined> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("services").select("*").eq("slug", slug).maybeSingle();
    if (!error && data) return mapServiceRow(data);
    if (!error && !data) return undefined; // genuinely doesn't exist
  }
  return staticGetServiceBySlug(slug);
}

// ---------------------------------------------------------------------------
// guides
// ---------------------------------------------------------------------------
function mapGuideRow(row: any): Guide {
  return {
    slug: row.slug,
    category: row.category,
    title: row.title,
    summary: row.summary,
    readTimeMinutes: row.read_time_minutes,
    lastReviewed: row.last_reviewed,
    reviewer: row.reviewer ?? undefined,
    needsReview: row.needs_review ?? false,
    body: row.body ?? [],
    relatedCalculators: row.related_calculators ?? [],
    relatedServices: row.related_services ?? [],
    relatedGuides: row.related_guides ?? [],
    sources: row.sources ?? [],
    seoDescription: row.seo_description,
  };
}

export async function getGuides(): Promise<Guide[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("guides").select("*").order("title", { ascending: true });
    if (!error && data && data.length > 0) return data.map(mapGuideRow);
  }
  return staticGuides;
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("guides").select("*").eq("slug", slug).maybeSingle();
    if (!error && data) return mapGuideRow(data);
    if (!error && !data) return undefined;
  }
  return staticGetGuideBySlug(slug);
}

// ---------------------------------------------------------------------------
// faqs
// ---------------------------------------------------------------------------
function mapFaqRow(row: any): FAQ {
  return {
    id: row.id,
    category: row.category,
    question: row.question,
    answer: row.answer,
    relatedCalculator: row.related_calculator ?? undefined,
    relatedGuide: row.related_guide ?? undefined,
  };
}

export async function getFaqs(): Promise<FAQ[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("faqs").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data.map(mapFaqRow);
  }
  return staticFaqs;
}

// ---------------------------------------------------------------------------
// testimonials
// ---------------------------------------------------------------------------
export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("testimonials").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data.map((row: any) => ({ name: row.name, service: row.service, quote: row.quote, rating: row.rating }));
  }
  return staticTestimonials;
}

// ---------------------------------------------------------------------------
// video_testimonials
// ---------------------------------------------------------------------------
export async function getVideoTestimonials(): Promise<VideoTestimonial[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("video_testimonials").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data.map((row: any) => ({ name: row.name, service: row.service, quote: row.quote, poster: row.poster_url, video: row.video_url }));
  }
  return staticVideoTestimonials;
}

// ---------------------------------------------------------------------------
// updates (blog)
// ---------------------------------------------------------------------------
function mapUpdateRow(row: any): SiteUpdate {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    published: row.published,
    lastReviewed: row.last_reviewed,
    appliesFrom: row.applies_from,
    body: row.body,
    imageUrl: row.image_url ?? undefined,
  };
}

export async function getUpdates(): Promise<SiteUpdate[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    // RLS already restricts anonymous reads to is_published = true rows.
    const { data, error } = await supabase.from("updates").select("*").order("published", { ascending: false });
    if (!error && data && data.length > 0) return data.map(mapUpdateRow);
  }
  return staticUpdates;
}

// ---------------------------------------------------------------------------
// hero_slides
// ---------------------------------------------------------------------------
export async function getHeroSlides(): Promise<HeroSlide[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("hero_slides").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((row: any) => ({
        title: row.title,
        subtitle: row.subtitle,
        ctaLabel: row.cta_label,
        ctaHref: row.cta_href,
        image: row.image_url,
        cardMedia: row.card_media_url || undefined,
      }));
    }
  }
  return staticHeroSlides;
}

// ---------------------------------------------------------------------------
// appointment_types
// ---------------------------------------------------------------------------
export async function getAppointmentTypes(): Promise<AppointmentTypeDef[]> {
  const supabase = getPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("appointment_types").select("*").order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((row: any) => ({ id: row.id, label: row.label, durationMinutes: row.duration_minutes, description: row.description, priceLabel: row.price_label }));
    }
  }
  return staticAppointmentTypes;
}
