// Maps the site's existing static /data files onto the Supabase table shapes
// in supabase/schema.sql, for the one-time "Import existing content" button
// in the admin (see app/admin/content/import/page.tsx). This lets a client
// inherit everything that's already on the site instead of starting from an
// empty CMS.
import { services } from "@/data/services";
import { guides } from "@/data/guides";
import { faqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { videoTestimonials } from "@/data/video-testimonials";
import { updates } from "@/data/updates";
import { heroSlides } from "@/data/hero-slides";
import { appointmentTypes } from "@/data/appointment-types";

export interface SeedSource {
  resourceKey: string;
  table: string;
  count: number;
  /**
   * Column to upsert on so re-running the import doesn't create duplicates.
   * Left undefined for tables with no natural unique key in the source data
   * (testimonials, video testimonials, hero slides) — those are plain
   * inserts, guarded by a row-count check in the import UI instead.
   */
  conflictColumn?: string;
  rows: Record<string, unknown>[];
}

export const seedSources: SeedSource[] = [
  {
    resourceKey: "services",
    table: "services",
    conflictColumn: "slug",
    count: services.length,
    rows: services.map((s, i) => ({
      slug: s.slug,
      category: s.category,
      title: s.title,
      short_description: s.shortDescription,
      problem_statement: s.problemStatement,
      who_its_for: s.whoItsFor,
      what_we_help_with: s.whatWeHelpWith,
      process: s.process,
      documents_needed: s.documentsNeeded,
      typical_questions: s.typicalQuestions,
      related_calculators: s.relatedCalculators ?? [],
      related_guides: s.relatedGuides ?? [],
      sort_order: i,
    })),
  },
  {
    resourceKey: "guides",
    table: "guides",
    conflictColumn: "slug",
    count: guides.length,
    rows: guides.map((g) => ({
      slug: g.slug,
      category: g.category,
      title: g.title,
      summary: g.summary,
      read_time_minutes: g.readTimeMinutes,
      last_reviewed: g.lastReviewed,
      reviewer: g.reviewer ?? null,
      needs_review: g.needsReview ?? false,
      body: g.body,
      related_calculators: g.relatedCalculators ?? [],
      related_services: g.relatedServices ?? [],
      related_guides: g.relatedGuides ?? [],
      sources: g.sources,
      seo_description: g.seoDescription,
    })),
  },
  {
    resourceKey: "faqs",
    table: "faqs",
    conflictColumn: "id",
    count: faqs.length,
    rows: faqs.map((f, i) => ({
      id: f.id,
      category: f.category,
      question: f.question,
      answer: f.answer,
      related_calculator: f.relatedCalculator ?? null,
      related_guide: f.relatedGuide ?? null,
      sort_order: i,
    })),
  },
  {
    resourceKey: "testimonials",
    table: "testimonials",
    count: testimonials.length,
    rows: testimonials.map((t, i) => ({
      name: t.name,
      service: t.service,
      quote: t.quote,
      rating: t.rating,
      sort_order: i,
    })),
  },
  {
    resourceKey: "video_testimonials",
    table: "video_testimonials",
    count: videoTestimonials.length,
    rows: videoTestimonials.map((v, i) => ({
      name: v.name,
      service: v.service,
      quote: v.quote,
      poster_url: v.poster,
      video_url: v.video,
      sort_order: i,
    })),
  },
  {
    resourceKey: "updates",
    table: "updates",
    conflictColumn: "slug",
    count: updates.length,
    rows: updates.map((u) => ({
      slug: u.slug,
      title: u.title,
      category: u.category,
      summary: u.summary,
      body: u.body,
      image_url: null,
      published: u.published,
      last_reviewed: u.lastReviewed,
      applies_from: u.appliesFrom,
      is_published: true,
    })),
  },
  {
    resourceKey: "hero_slides",
    table: "hero_slides",
    count: heroSlides.length,
    rows: heroSlides.map((h, i) => ({
      title: h.title,
      subtitle: h.subtitle,
      cta_label: h.ctaLabel,
      cta_href: h.ctaHref,
      image_url: h.image,
      sort_order: i,
    })),
  },
  {
    resourceKey: "appointment_types",
    table: "appointment_types",
    conflictColumn: "id",
    count: appointmentTypes.length,
    rows: appointmentTypes.map((a, i) => ({
      id: a.id,
      label: a.label,
      duration_minutes: a.durationMinutes,
      description: a.description,
      price_label: a.priceLabel,
      sort_order: i,
    })),
  },
];
