export interface Testimonial {
  name: string;
  service: string;
  quote: string;
  rating: number;
}

// Illustrative testimonials — swap in real client quotes (with permission)
// once available.
export const testimonials: Testimonial[] = [
  {
    name: "Amara Okafor",
    service: "Spouse Visa",
    quote:
      "Dori Solic walked us through the financial requirement step by step. What felt overwhelming became a checklist we could actually follow.",
    rating: 5,
  },
  {
    name: "James Whitfield",
    service: "Self-Assessment Tax",
    quote:
      "I'd been putting off my tax return for months. Their calculator showed me exactly what I owed before I'd even spoken to anyone.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    service: "Indefinite Leave to Remain",
    quote:
      "Clear, honest guidance on our ILR application — no jargon, just straight answers about what we actually needed.",
    rating: 5,
  },
  {
    name: "Tomasz Kowalski",
    service: "Universal Credit",
    quote:
      "The benefits calculator gave me a realistic number in minutes. It made a genuinely stressful situation much easier to plan around.",
    rating: 5,
  },
  {
    name: "Grace Adeyemi",
    service: "British Citizenship",
    quote:
      "From ILR to citizenship, they explained every stage clearly. Booking a consultation when we needed one was simple too.",
    rating: 5,
  },
  {
    name: "Daniel Osei",
    service: "Take-Home Pay Calculator",
    quote:
      "Before accepting a new job offer, I used their salary calculator to see my real take-home pay. Genuinely useful, no signup required.",
    rating: 5,
  },
];
