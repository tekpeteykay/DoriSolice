// Registry of every editable section on every public page — the single
// source of truth for what the "Page Content" admin area shows (grouped by
// page, top to bottom in the order each section actually appears on the
// live page) and what each field defaults to when nothing's been saved to
// the database yet.
//
// Deliberately NOT covered here: the calculators themselves (their
// questions/results copy lives in lib/calculators/*, a much larger
// structured system of its own), the "What do I need?" guided-journey
// question flow, the appointment-prep intake questions, and small
// interaction-only UI strings (aria-labels, empty-state micro-copy). Those
// are flagged separately rather than silently left out — see the README /
// the message this shipped with.
import { FieldConfig } from "./types";

export interface PageSectionConfig {
  key: string;
  label: string;
  fields: FieldConfig[];
  defaults: Record<string, unknown>;
  /** For a section that's actually edited somewhere else already (e.g. the
   * homepage hero, which is the existing Hero Slides resource) — shown as a
   * pointer card instead of a field form. */
  linkedResource?: { label: string; href: string };
}

export interface PageConfig {
  key: string;
  label: string;
  path: string; // used for the "View page" link and for revalidation
  sections: PageSectionConfig[];
}

export const pageRegistry: PageConfig[] = [
  {
    key: "home",
    label: "Home",
    path: "/",
    sections: [
      {
        key: "hero",
        label: "Hero banner",
        fields: [],
        defaults: {},
        linkedResource: { label: "Edit under Content & Rules → Hero Slides", href: "/admin/content/hero_slides" },
      },
      {
        key: "whats-new-intro",
        label: "“See What's New” strip + intro",
        fields: [
          { key: "heading", label: "“See What's New” heading", type: "textarea", helpText: "Shown as three stacked lines — put each line on its own line." },
          { key: "intro_heading", label: "Intro heading", type: "text" },
          { key: "intro_body", label: "Intro paragraph", type: "textarea" },
          { key: "prompt_label", label: "“Where do you want to start” label", type: "text" },
          {
            key: "actions",
            label: "Quick-start cards",
            type: "object-array",
            itemLabel: "card",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "text" },
              { key: "href", label: "Link", type: "text" },
            ],
          },
        ],
        defaults: {
          heading: "See\nWhat's\nNew",
          intro_heading: "Hi, We're DoriSolic",
          intro_body:
            "Hi, we're Dori Solic. We think most people don't need a lecture in legal jargon — they just want to know where they stand. So that's where we start: plain answers, real numbers, and a friendly face when you're ready for one.",
          prompt_label: "Where do you want to start?",
          actions: [
            { title: "Calculate", description: "Work out your tax, salary, benefits or visa figures.", href: "/calculators" },
            { title: "Check eligibility", description: "Find out whether you may qualify.", href: "/what-do-i-need" },
            { title: "Get information", description: "Understand UK rules in plain English.", href: "/guides" },
            { title: "Book an appointment", description: "Speak directly with our team.", href: "/appointment" },
          ],
        },
      },
      {
        key: "life-moments",
        label: "“Life Doesn't Come With Categories” cards",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "subheading", label: "Subheading", type: "text" },
          {
            key: "cards",
            label: "Cards",
            type: "object-array",
            itemLabel: "card",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Front-of-card description", type: "textarea" },
              { key: "details", label: "Back-of-card detail (shown on hover)", type: "textarea" },
              { key: "href", label: "Link", type: "text" },
            ],
          },
        ],
        defaults: {
          heading: "Life Doesn't Come With Categories",
          subheading: "But your situation probably sounds like one of these",
          cards: [
            {
              title: "Moving to the UK to be with someone",
              description: "Spouse and partner visas, financial requirements, and what evidence you'll actually need.",
              details: "We help you gather the right evidence, meet the minimum income requirement, and avoid the reasons applications most often get refused.",
              href: "/immigration",
            },
            {
              title: "Starting a new job",
              description: "See your real take-home pay before you say yes to the offer.",
              details: "We factor in your tax code, student loan repayments, and pension contributions, so the number you plan around is the one that actually lands in your account.",
              href: "/calculators/salary/take-home-pay",
            },
            {
              title: "Settling in for the long run",
              description: "ILR, citizenship, and understanding what 'settled' actually means.",
              details: "From counting your qualifying years to preparing for the Life in the UK test, we help you build a timeline that avoids costly gaps in your status.",
              href: "/guides/immigration/what-is-ilr",
            },
            {
              title: "Working things out for yourself",
              description: "Self-employed tax, Universal Credit, and other money questions people quietly Google at midnight.",
              details: "Whether you're freelancing, driving for an app, or between jobs, we help you understand what you owe, what you're entitled to, and how the two interact.",
              href: "/tax-and-benefits",
            },
          ],
        },
      },
      {
        key: "about",
        label: "About Us",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "body", label: "Body text", type: "textarea" },
          { key: "button_label", label: "Button label", type: "text" },
        ],
        defaults: {
          eyebrow: "About Us",
          heading: "Legal, tax and immigration guidance that starts with understanding, not jargon.",
          body: "Dori Solic was built around a simple idea: most people don't need a wall of legal language, they need to understand where they stand — and to know when it's time to bring in professional help.",
          button_label: "Book an appointment",
        },
      },
      {
        key: "popular-calculators",
        label: "Popular calculators",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "description", label: "Description", type: "text" },
          { key: "button_label", label: "Button label", type: "text" },
        ],
        defaults: {
          eyebrow: "Popular calculators",
          heading: "Need to know how much tax you'll pay?",
          description: "Calculate it — with a full breakdown, not just a number.",
          button_label: "View all calculators",
        },
      },
      {
        key: "immigration-tax-split",
        label: "Immigration / Tax & Benefits panels",
        fields: [
          { key: "immigration_eyebrow", label: "Immigration panel — small label", type: "text" },
          { key: "immigration_heading", label: "Immigration panel — heading", type: "text" },
          { key: "immigration_description", label: "Immigration panel — description", type: "textarea" },
          { key: "immigration_button_label", label: "Immigration panel — button label", type: "text" },
          { key: "immigration_link_label", label: "Immigration panel — text link label", type: "text" },
          { key: "tax_eyebrow", label: "Tax & Benefits panel — small label", type: "text" },
          { key: "tax_heading", label: "Tax & Benefits panel — heading", type: "text" },
          { key: "tax_description", label: "Tax & Benefits panel — description", type: "textarea" },
          { key: "tax_button_label", label: "Tax & Benefits panel — button label", type: "text" },
          { key: "tax_link_label", label: "Tax & Benefits panel — text link label", type: "text" },
        ],
        defaults: {
          immigration_eyebrow: "Immigration",
          immigration_heading: "Trying to bring your partner to the UK?",
          immigration_description: "Understand the financial requirement, check your figures, and see the evidence you may need.",
          immigration_button_label: "Calculate the requirement",
          immigration_link_label: "Explore immigration",
          tax_eyebrow: "Tax & Benefits",
          tax_heading: "Not sure what you qualify for?",
          tax_description: "Work it out with our Universal Credit estimator, or see your estimated take-home pay in seconds.",
          tax_button_label: "Check Universal Credit",
          tax_link_label: "Explore tax & benefits",
        },
      },
      {
        key: "real-questions",
        label: "“People actually ask us this”",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "button_label", label: "Button label", type: "text" },
        ],
        defaults: {
          eyebrow: "People actually ask us this",
          heading: "No question is too small to Google at 11pm.",
          description: "We hear versions of these questions all the time. Chances are, if you're wondering, someone else asked us the same thing last week.",
          button_label: "See more questions",
        },
      },
      {
        key: "guides-preview",
        label: "“Understand the rules first” (guides preview)",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "text" },
          { key: "button_label", label: "Button label", type: "text" },
        ],
        defaults: {
          eyebrow: "UK guides",
          heading: "Understand the rules first.",
          description: "Plain-English explainers, reviewed and dated, on the topics people ask us about most.",
          button_label: "Browse all guides",
        },
      },
      {
        key: "why-dori-solic",
        label: "Why Dori Solic",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "textarea" },
          { key: "description", label: "Description", type: "text" },
          {
            key: "points",
            label: "Points",
            type: "object-array",
            itemLabel: "point",
            subFields: [
              { key: "title", label: "Title", type: "text" },
              { key: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
        defaults: {
          eyebrow: "Why Dori Solic",
          heading: "Before you speak to a solicitor, understand your situation.",
          description: "When you need professional help, we're there.",
          points: [
            { title: "Straight answers", description: "No unnecessary jargon — just a clear explanation of where you stand." },
            { title: "Built on real rules", description: "Every calculator is built on a versioned, sourced set of official rates and thresholds." },
            { title: "Accessible from day one", description: "Whether or not you've dealt with a solicitor before, the site is built to make sense." },
            { title: "Professional when it matters", description: "When your situation needs it, book time with our team — with the groundwork already done." },
          ],
        },
      },
      {
        key: "testimonials",
        label: "“Hear it from our Clients” (written testimonials)",
        fields: [
          { key: "heading_prefix", label: "Heading — first part", type: "text" },
          { key: "heading_highlight", label: "Heading — highlighted part", type: "text" },
          { key: "bottom_heading", label: "Bottom heading (“We did it for others!”)", type: "textarea" },
          { key: "bottom_description", label: "Bottom description", type: "textarea" },
        ],
        defaults: {
          heading_prefix: "Hear it from",
          heading_highlight: "our Clients",
          bottom_heading: "We did it\nfor others!",
          bottom_description:
            "These are just a few of the people we've helped find clarity in UK tax, immigration and benefit matters. Every situation is different, but the goal is always the same: helping you understand exactly where you stand before you decide what to do next.",
        },
      },
      {
        key: "video-testimonials",
        label: "Video testimonials",
        fields: [{ key: "heading", label: "Heading", type: "textarea", helpText: "Shown across two lines — put each line on its own line." }],
        defaults: { heading: "Don't take our word for it!\nHear it from others" },
      },
      {
        key: "featured-services",
        label: "Featured services",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "text" },
          { key: "button_label", label: "Button label", type: "text" },
        ],
        defaults: {
          eyebrow: "Featured services",
          heading: "Need someone to look at your situation?",
          description: "Talk to us — once you know roughly what you need, we can take it from there.",
          button_label: "View all services",
        },
      },
      {
        key: "faq-preview",
        label: "FAQs",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "cta_heading", label: "Bottom CTA — heading", type: "text" },
          { key: "cta_description", label: "Bottom CTA — description", type: "text" },
          { key: "cta_button_label", label: "Bottom CTA — button label", type: "text" },
        ],
        defaults: {
          heading: "Frequently asked questions",
          cta_heading: "Didn't find your question?",
          cta_description: "Book a consultation and ask us directly.",
          cta_button_label: "Book an appointment",
        },
      },
      {
        key: "home-contact",
        label: "“Get in touch”",
        fields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "button_label", label: "Button label", type: "text" },
          { key: "form_name_placeholder", label: "Form — name field placeholder", type: "text" },
          { key: "form_email_placeholder", label: "Form — email field placeholder", type: "text" },
          { key: "form_message_placeholder", label: "Form — message field placeholder", type: "text" },
          { key: "consent_text", label: "Consent checkbox text", type: "textarea", helpText: "“Privacy Policy” is always added as a link straight after this." },
          { key: "success_message", label: "Message shown after the form is submitted", type: "text" },
        ],
        defaults: {
          heading: "Get in touch",
          description: "For anything urgent or specific to your case, booking an appointment is the fastest route.",
          button_label: "Book an appointment instead",
          form_name_placeholder: "Name",
          form_email_placeholder: "Email",
          form_message_placeholder: "Message",
          consent_text: "I consent to Dori Solic contacting me about this enquiry in line with the",
          success_message: "Thanks — we'll be in touch shortly.",
        },
      },
    ],
  },
  {
    key: "services",
    label: "Services (list page)",
    path: "/services",
    sections: [
      {
        key: "hero",
        label: "Hero + bottom CTA",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "cta_heading", label: "Bottom CTA — heading", type: "text" },
          { key: "cta_button_label", label: "Bottom CTA — button label", type: "text" },
        ],
        defaults: {
          eyebrow: "How we can help",
          heading: "Professional help, once you know what you need.",
          description: "Every service starts with understanding your situation — use our guides and calculators first, then book a consultation when you're ready.",
          cta_heading: "Not sure which service applies to you?",
          cta_button_label: "Help me find the right service",
        },
      },
    ],
  },
  {
    key: "service-detail",
    label: "Service pages (shared layout)",
    path: "/services/[category]/[slug]",
    sections: [
      {
        key: "chrome",
        label: "Shared headings & CTA",
        fields: [
          { key: "who_its_for_heading", label: "“Who this is for” heading", type: "text" },
          { key: "what_we_help_with_heading", label: "“What we help with” heading", type: "text" },
          { key: "process_heading", label: "“Our process” heading", type: "text" },
          { key: "documents_heading", label: "“Documents needed” heading", type: "text" },
          { key: "common_questions_heading", label: "“Common questions” heading", type: "text" },
          { key: "related_guides_heading", label: "“Related guides” heading", type: "text" },
          { key: "calculate_button_label", label: "“Try the calculator” button label", type: "text" },
          { key: "cta_heading", label: "Bottom CTA — heading", type: "text" },
          { key: "cta_description", label: "Bottom CTA — description", type: "text" },
        ],
        defaults: {
          who_its_for_heading: "Who this is for",
          what_we_help_with_heading: "What we help with",
          process_heading: "Our process",
          documents_heading: "Documents & information you may need",
          common_questions_heading: "Common questions",
          related_guides_heading: "Related guides",
          calculate_button_label: "Try the calculator",
          cta_heading: "Ready to talk to us?",
          cta_description: "Book a consultation and we'll take it from here.",
        },
      },
    ],
  },
  {
    key: "guides",
    label: "Guides (list page)",
    path: "/guides",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
        defaults: {
          eyebrow: "UK information hub",
          heading: "Understand the rules before you need a solicitor.",
          description: "Plain-English guides to UK tax, benefits, immigration and employment rights — reviewed and dated so you know what you're reading is current.",
        },
      },
    ],
  },
  {
    key: "guide-detail",
    label: "Guide pages (shared layout)",
    path: "/guides/[category]/[slug]",
    sections: [
      {
        key: "chrome",
        label: "Shared headings & CTA",
        fields: [
          { key: "calculate_eyebrow", label: "“Put this into practice” small label", type: "text" },
          { key: "calculate_heading", label: "“Calculate your own figures” heading", type: "text" },
          { key: "cta_heading", label: "Bottom CTA — heading", type: "text" },
          { key: "cta_description", label: "Bottom CTA — description", type: "text" },
          { key: "related_services_heading", label: "“Related services” heading", type: "text" },
        ],
        defaults: {
          calculate_eyebrow: "Put this into practice",
          calculate_heading: "Calculate your own figures",
          cta_heading: "Need help with your specific situation?",
          cta_description: "Book a consultation and we'll look at your circumstances directly.",
          related_services_heading: "Related services",
        },
      },
    ],
  },
  {
    key: "immigration",
    label: "Immigration hub",
    path: "/immigration",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "button1_label", label: "First button label", type: "text" },
          { key: "button2_label", label: "Second button label", type: "text" },
        ],
        defaults: {
          eyebrow: "Immigration",
          heading: "Understand the UK immigration route that applies to you.",
          description: "Family visas, work visas, study, settlement and citizenship — explained in plain English, with calculators to check the numbers.",
          button1_label: "I'm not sure what I need",
          button2_label: "Book an appointment",
        },
      },
    ],
  },
  {
    key: "tax-and-benefits",
    label: "Tax & Benefits hub",
    path: "/tax-and-benefits",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "button1_label", label: "First button label", type: "text" },
          { key: "button2_label", label: "Second button label", type: "text" },
        ],
        defaults: {
          eyebrow: "Tax & Benefits",
          heading: "Understand your tax, and what you may be entitled to.",
          description: "From take-home pay to Universal Credit, get a clear estimate before you make a decision.",
          button1_label: "Tax calculators",
          button2_label: "Benefit calculators",
        },
      },
      {
        key: "content",
        label: "Section headings",
        fields: [
          { key: "calculators_heading", label: "Calculators section heading", type: "text" },
          { key: "guides_heading", label: "Guides section heading", type: "text" },
          { key: "browse_all_label", label: "“Browse all guides” link label", type: "text" },
        ],
        defaults: {
          calculators_heading: "Popular tax & salary calculators",
          guides_heading: "Guides",
          browse_all_label: "Browse all guides →",
        },
      },
    ],
  },
  {
    key: "calculators",
    label: "Calculators hub",
    path: "/calculators",
    sections: [
      {
        key: "hero",
        label: "Hero + search",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "search_placeholder", label: "Search box placeholder text", type: "text" },
          { key: "all_button_label", label: "“All calculators” filter label", type: "text" },
        ],
        defaults: {
          eyebrow: "Calculator platform",
          heading: "Every UK number, worked out for you.",
          description: "Tax, salary, benefits and immigration calculators — built on the same rules the professionals use, explained in plain English.",
          search_placeholder: "Search calculators (e.g. VAT, spouse visa, Universal Credit)",
          all_button_label: "All calculators",
        },
      },
    ],
  },
  {
    key: "blog",
    label: "Blog",
    path: "/blog",
    sections: [
      {
        key: "hero",
        label: "Heading",
        fields: [{ key: "heading", label: "Heading", type: "text" }],
        defaults: { heading: "Our Blog" },
      },
    ],
  },
  {
    key: "updates",
    label: "Updates",
    path: "/updates",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
        defaults: {
          eyebrow: "Updates",
          heading: "UK rule changes worth knowing about.",
          description: "Tax year changes, immigration rule changes, benefit changes and important deadlines.",
        },
      },
    ],
  },
  {
    key: "appointment",
    label: "Book an Appointment",
    path: "/appointment",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
        defaults: {
          eyebrow: "Book an appointment",
          heading: "Let's find a time that works.",
          description: "Tell us what you need, choose a slot, and we'll take it from there.",
        },
      },
    ],
  },
  {
    key: "appointment-prepare",
    label: "Prepare for Appointment",
    path: "/appointment/prepare",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
        defaults: {
          eyebrow: "Prepare for your appointment",
          heading: "A few quick questions.",
          description: "This helps us prepare in advance — it's optional, and only takes a minute.",
        },
      },
    ],
  },
  {
    key: "what-do-i-need",
    label: "What Do I Need?",
    path: "/what-do-i-need",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "eyebrow", label: "Small label above the heading", type: "text" },
          { key: "heading", label: "Heading", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
        ],
        defaults: {
          eyebrow: "Not sure where to start?",
          heading: "Let's work out what you need.",
          description: "Answer a couple of quick questions and we'll point you to the right guide, calculator or service.",
        },
      },
    ],
  },
  {
    key: "search",
    label: "Search",
    path: "/search",
    sections: [
      {
        key: "content",
        label: "Labels",
        fields: [
          { key: "label", label: "Small label above the results heading", type: "text" },
          { key: "empty_state_message", label: "“No results” message", type: "textarea" },
          { key: "empty_state_button_label", label: "“No results” button label", type: "text" },
        ],
        defaults: {
          label: "Search Dori Solic",
          empty_state_message: "We couldn't find a match for that. Try a calculator, a guide topic, or book an appointment and we'll help directly.",
          empty_state_button_label: "Book an appointment",
        },
      },
    ],
  },
  {
    key: "privacy",
    label: "Privacy Policy",
    path: "/privacy",
    sections: [legalSection("Privacy Policy", [
      { heading: "Who we are", body: ["Dori Solic (\"we\", \"us\") provides UK legal, tax and immigration information and professional services. [Add full company/registration details]."] },
      {
        heading: "What we collect",
        body: [
          "We collect information you provide directly — for example, through the contact form, appointment booking, or an intake questionnaire. This may include your name, contact details, and a brief description of your matter.",
          "We do not ask for more sensitive personal data than is necessary for the purpose you're using the site for, and calculator inputs are processed in your browser rather than being stored against your identity unless you submit them as part of a booking or enquiry.",
        ],
      },
      { heading: "How we use it", body: ["To respond to enquiries, manage appointments, and — only with separate marketing consent — to send occasional updates about UK legal, tax and immigration matters."] },
      { heading: "Data retention", body: ["We keep personal data only for as long as necessary for the purpose it was collected, and in line with our professional and regulatory obligations. [Add specific retention periods once confirmed]."] },
      { heading: "Your rights", body: ["Under UK GDPR, you have rights to access, correct, or request deletion of your personal data, among others. [Add contact details for exercising these rights]."] },
      { heading: "Contact", body: ["[Add data protection contact details]."] },
    ])],
  },
  {
    key: "cookies",
    label: "Cookie Policy",
    path: "/cookies",
    sections: [legalSection("Cookie Policy", [
      { heading: "What are cookies", body: ["Cookies are small files stored on your device that help websites function and, where permitted, understand how they're used."] },
      {
        heading: "Cookies we use",
        body: [
          "Strictly necessary cookies required for the site to function (e.g. remembering your progress through a calculator or booking flow).",
          "[Add details of any analytics or marketing cookies once configured, along with the relevant consent mechanism].",
        ],
      },
      { heading: "Managing cookies", body: ["You can control cookies through your browser settings. Blocking some cookies may affect how parts of the site work."] },
    ])],
  },
  {
    key: "terms",
    label: "Terms of Use",
    path: "/terms",
    sections: [legalSection("Terms of Use", [
      { heading: "Using this website", body: ["This website provides general information and estimation tools relating to UK tax, benefits and immigration matters. It is not a substitute for individual professional advice."] },
      { heading: "No guaranteed outcomes", body: ["Calculator results are estimates based on the information you provide and the rules in force at the time. They do not constitute an official HMRC, DWP or Home Office decision."] },
      { heading: "Engaging our services", body: ["Specific terms apply once you engage us for a paid service — these will be set out separately in a client care letter or engagement terms. [Add link once available]."] },
      { heading: "Limitation of liability", body: ["[To be reviewed and finalised by the firm's legal/compliance team before production use.]"] },
    ])],
  },
  {
    key: "disclaimer",
    label: "Disclaimer",
    path: "/disclaimer",
    sections: [legalSection("Disclaimer", [
      {
        heading: "General information, not advice",
        body: [
          "Information provided by Dori Solic — including guides, FAQs and calculator results — is for general information and does not necessarily constitute legal, tax or financial advice. Individual circumstances may produce different outcomes.",
        ],
      },
      {
        heading: "Calculators",
        body: ["This calculator provides an estimate based on the information you enter and the rules selected. It is not an official HMRC, DWP or Home Office decision and should not be treated as legal or financial advice."],
      },
      { heading: "Rules can change", body: ["UK tax, benefit and immigration rules change frequently, sometimes with little notice. Each guide and calculator shows when it was last reviewed — always confirm the current position before relying on it for an important decision."] },
      { heading: "Regulatory information", body: ["[Add SRA or other relevant regulatory information here.]"] },
    ])],
  },
];

// Legal pages share one shape: a title, an "updated" date string, and a list
// of { heading, body } sections. Body paragraphs are stored joined by a
// blank line in a single textarea and split back apart when rendered.
function legalSection(title: string, sections: { heading: string; body: string[] }[]): PageSectionConfig {
  return {
    key: "content",
    label: "Page content",
    fields: [
      { key: "title", label: "Page title", type: "text" },
      { key: "updated", label: "“Last updated” text", type: "text" },
      {
        key: "sections",
        label: "Sections",
        type: "object-array",
        itemLabel: "section",
        subFields: [
          { key: "heading", label: "Heading", type: "text" },
          { key: "body", label: "Body — leave a blank line between paragraphs", type: "textarea" },
        ],
      },
    ],
    defaults: {
      title,
      updated: "[Add date once reviewed]",
      sections: sections.map((s) => ({ heading: s.heading, body: s.body.join("\n\n") })),
    },
  };
}

export function getPage(key: string): PageConfig | undefined {
  return pageRegistry.find((p) => p.key === key);
}
