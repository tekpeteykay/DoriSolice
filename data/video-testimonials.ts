export interface VideoTestimonial {
  name: string;
  service: string;
  quote: string;
  poster: string;
  video: string;
}

// Illustrative placeholder clips — swap `video`/`poster` for real client
// testimonial videos (filmed in the same 9:16 story format) once available.
export const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Amara Okafor",
    service: "Spouse Visa",
    quote: "Dori Solic walked us through the financial requirement step by step, in plain English.",
    poster: "/video-testimonials/testimonial-4.jpg",
    video: "/video-testimonials/testimonial-4.mp4",
  },
  {
    name: "Mr Anderson",
    service: "Skilled Worker Visa",
    quote: "Dori Solic was built around a simple idea: most people don't need a wall of legal jargon.",
    poster: "/video-testimonials/testimonial-2.jpg",
    video: "/video-testimonials/testimonial-2.mp4",
  },
  {
    name: "James Whitfield",
    service: "Self-Assessment Tax",
    quote: "Their calculator showed me exactly what I owed before I'd even spoken to anyone.",
    poster: "/video-testimonials/testimonial-3.jpg",
    video: "/video-testimonials/testimonial-3.mp4",
  },
  {
    name: "Priya Nair",
    service: "Indefinite Leave to Remain",
    quote: "Clear, honest guidance on our ILR application — no jargon, just straight answers.",
    poster: "/video-testimonials/testimonial-1.jpg",
    video: "/video-testimonials/testimonial-1.mp4",
  },
  {
    name: "Tomasz Kowalski",
    service: "Universal Credit",
    quote: "The benefits calculator gave me a realistic number in minutes.",
    poster: "/video-testimonials/testimonial-4.jpg",
    video: "/video-testimonials/testimonial-4.mp4",
  },
  {
    name: "Grace Adeyemi",
    service: "British Citizenship",
    quote: "From ILR to citizenship, they explained every stage clearly.",
    poster: "/video-testimonials/testimonial-2.jpg",
    video: "/video-testimonials/testimonial-2.mp4",
  },
];
