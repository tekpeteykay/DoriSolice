# Dori Solic — UK Legal, Tax & Immigration Platform

A Next.js platform combining a solicitor website, a UK legal/tax/immigration information hub, an interactive calculator platform, and an appointment booking system — built to be extended by a non-developer editing data files, not by rewriting components.

## A. Technology stack

- **Next.js 14 (App Router) + TypeScript** — file-based routing, server components by default, static generation for content pages, excellent SEO support out of the box.
- **Tailwind CSS** — the design system (colours, spacing, radii, gradients) is defined once in `tailwind.config.ts`.
- **Hand-built, lightweight component primitives** (`components/ui/*`) instead of a heavy component library — kept intentionally small and easy to read, in the spirit of shadcn/ui without adding its full dependency surface.
- **Framer Motion** for the handful of scroll/entry animations, and **lucide-react** for icons — both small, focused dependencies.
- **No database yet** — all content (guides, services, FAQs, calculator rules) lives in typed data files under `/data`. This was a deliberate choice for this stage: it's simple to read, diff, and edit, and every type in `/types/index.ts` is written so the same shapes can later be read from Supabase (or any other backend) without changing the components that consume them.

Fonts: **Sora**, self-hosted via `@fontsource/sora` (rather than fetched from Google Fonts at build time), so the site builds and renders identically with no runtime dependency on Google's font CDN.

## B. Project structure

```
app/                    Routes (App Router). Each folder is a URL segment.
  calculators/          Calculator hub + /calculators/[category]/[slug]
  guides/                UK information hub + /guides/[category]/[slug]
  services/              Services hub + /services/[category]/[slug]
  immigration/           Immigration route hub
  tax-and-benefits/      Tax & benefits hub
  appointment/           Booking wizard + /appointment/prepare (intake)
  what-do-i-need/        Guided decision-tree journey
  admin/                 Admin dashboard scaffold (mock data)
  search/                Site-wide search results
  about, contact, faq, updates, privacy, cookies, terms, disclaimer

components/
  ui/                    Design-system primitives (buttons, cards, badges, disclaimers, breadcrumbs…)
  layout/                Navbar, Footer
  home/                  Homepage sections
  calculators/           Calculator runner, question fields, result view
  booking/               Booking wizard, intake questionnaire, document checklist
  journey/               "What do I need?" guided decision tree
  guides/, services/     Card components for listing pages
  admin/                 Admin shell/sidebar
  seo/                   JSON-LD helper

data/                    ALL editable content and rules — see section E below
lib/
  calculators/           Calculator engine + individual calculator definitions
  search.ts              Site-wide search index + matching logic
  site-config.ts         Nav links, footer links, business placeholder details
  utils.ts               Formatting helpers (currency, dates, cn())
types/index.ts           Shared data models (Guide, Service, Calculator, Appointment, …)
```

## C. Sitemap (what's live today)

- `/` — homepage
- `/calculators` (hub, filterable) and `/calculators/{category}/{slug}` — 10 fully working calculators, plus ~30 more listed as "coming soon" cards (see `data/calculator-catalogue.ts`) so the full information architecture from the brief is visible even before every tool is built
- `/guides` (hub, filterable) and `/guides/{category}/{slug}` — 16 sample articles
- `/services` (hub) and `/services/{category}/{slug}` — 10 services
- `/immigration` — route-by-route hub linking guide → calculator → service
- `/tax-and-benefits` — tax/benefit calculators and guides in one place
- `/what-do-i-need` — the guided "I'm not sure what I need" decision tree
- `/appointment` — 5-step booking wizard; `/appointment/prepare` — post-booking intake questionnaire with dynamic document checklist
- `/search?q=` — site-wide search
- `/faq`, `/about`, `/contact`, `/updates`
- `/privacy`, `/cookies`, `/terms`, `/disclaimer`
- `/admin`, `/admin/appointments`, `/admin/enquiries`, `/admin/content` — structural scaffold, mock data (see section G)
- `/sitemap.xml`, `/robots.txt` — generated from the same data files

## D. Calculator engine

Every calculator is a `CalculatorDefinition` object (`types/index.ts`): a title/description, a list of typed questions (`currency`, `percentage`, `select`, `radio`, `yesno`, `date`, `number`, `checkbox`, with `showIf` for progressive disclosure), a pure `calculate(answers)` function, and metadata (assumptions, sources, rules version, last-updated date). The same three UI components — `CalculatorProgress`, `CalculatorQuestionField`, `CalculatorResultView` — render *every* calculator; adding a new one means writing a new definition in `lib/calculators/`, not new UI.

Built calculators: PAYE Income Tax, Take-Home Pay, VAT, Salary Converter, Self-Employment Tax, Spouse/Partner Visa financial requirement, Skilled Worker salary checker, Universal Credit estimator, ILR eligibility checker, Student visa funds calculator.

**Important:** calculator results are always framed as estimates ("Estimated result", "may be eligible", etc.), never as an official decision — see the `Disclaimer` component used on every result screen.

## E. Data & rules architecture (edit these, not the components)

| File | What it controls |
|---|---|
| `data/tax-years/2026-27.ts` | Personal Allowance, Income Tax bands (rUK + Scotland), NI, dividend tax, CGT, student loan thresholds, VAT rates |
| `data/immigration-rules/*.ts` | Spouse visa minimum income & savings formula, Skilled Worker thresholds, ILR/citizenship qualifying periods, Student visa funds |
| `data/benefit-rates/2026-27.ts` | Universal Credit, Child Benefit, statutory pay, Carer's Allowance rates |
| `data/guides.ts`, `data/services.ts`, `data/faqs.ts`, `data/updates.ts` | All content copy |
| `data/calculator-catalogue.ts` | The full calculator inventory shown on `/calculators` (built + "coming soon") |
| `data/appointment-types.ts` | Service areas, appointment durations/prices, available slots |

Every rule value carries a `source`, `effectiveFrom` and `lastReviewed` date (see the `RuleValue` type) so any figure can be traced and audited. **The specific numbers currently in these files are the most recently confirmed figures available at development time and are clearly commented as needing verification against GOV.UK/HMRC/Home Office/DWP before this site is used to advise real clients** — this was an explicit requirement in the brief (no fabricated figures presented as authoritative).

## F. Appointment booking architecture

`components/booking/BookingWizard.tsx` implements the 5-step flow (service → appointment type → date/time → details → confirmation) entirely client-side today. The submission point is clearly marked in the code (`handleSubmit`) with a comment showing where to add a real API call. To go live you would:

1. Add an API route (e.g. `app/api/appointments/route.ts`) that validates input server-side with `zod` (already a dependency) and writes an `Appointment` record (type already defined) to a database — Supabase is the natural fit given the stack.
2. Replace `getAvailableSlots()` in `data/appointment-types.ts` with a real call to Calendly/Google Calendar/Microsoft Bookings — every consumer only depends on the `{ date, times[] }` shape it returns today, so no UI changes are needed.
3. Add email confirmation (e.g. via Resend/Postmark) triggered from that API route.

The post-booking "Prepare for your appointment" step (`/appointment/prepare`) asks a short, service-specific set of questions (`data/intake-questions.ts`) and produces a dynamic, answer-driven document checklist (`components/booking/DocumentChecklist.tsx`) — never one fixed universal list.

## G. Admin / CMS architecture

`/admin` is a structural scaffold: a dashboard, an appointments table, an enquiries table, and a content/rules overview, all reading from the same typed data (currently mock data in `data/mock-admin-data.ts`, and the real `data/*` files for content/rules). **It is not authenticated** — before any real use, add auth (Supabase Auth is a natural fit) and gate `app/admin/layout.tsx` behind a signed-in, authorised session.

The point of this architecture is that changing "Tax year 2026/27" or "Minimum income requirement = £29,000" never requires touching a calculator component — it's a one-line edit in a `/data` file today, and would become a database row update once a CMS/database is connected.

## H. Search

`lib/search.ts` builds a single in-memory index from guides, calculators, services and FAQs (no external search service needed at this scale) and does simple keyword + synonym matching (e.g. "refund" also matches "overpaid", "uc" also matches "universal credit"). It's deliberately simple and fast; if the content library grows into the hundreds of pages the brief anticipates, this is the piece to swap for something like Algolia or a Postgres full-text index — the `SearchIndexItem` shape wouldn't need to change.

## I. What's a full build vs a scaffold

**Fully working today:** navigation (incl. mega menus, mobile menu, sticky/blur-on-scroll header), homepage, 10 interactive calculators with real calculation logic, calculator hub with search/filter, 16 guide articles, guide hub with search/filter, 10 service pages, services hub, immigration hub, the "What do I need?" guided decision tree, the 5-step appointment booking wizard, the post-booking intake questionnaire with dynamic checklists, site-wide search, FAQ page with accordion + JSON-LD, About/Contact/Updates/legal pages, admin dashboard (mock data), sitemap.xml/robots.txt.

**Scaffolded, ready to extend:** ~30 additional calculators listed on the hub as "coming soon" (the pattern to add one is identical to the 10 built ones); admin auth; real calendar/email integration for bookings; a real database (all types are already written for this).

**Explicitly left as placeholders, not fabricated:** phone/email/address/opening hours (`lib/site-config.ts`), regulatory/SRA information, team bios, testimonials/case studies, appointment pricing — all marked `[Add …]` in the UI, per the brief's explicit instruction not to invent these.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production build
```

No environment variables or external accounts are required to run the site as-is — everything runs from local data files. Environment variables would be introduced alongside whichever database, auth, calendar and email providers you choose (see sections F and G).
