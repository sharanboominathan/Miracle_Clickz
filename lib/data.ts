export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  hue: number; // base hue for the generated cinematic art
  hue2: number;
  image?: string; // sample demo photo — swap with real client imagery
};

export const CATEGORIES = [
  "All",
  "Wedding",
  "Pre Wedding",
  "Engagement",
  "Baby Shoot",
  "Maternity",
  "Traditional",
  "Candid",
  "Drone",
  "Fashion",
  "Commercial",
] as const;

// 6 sample portfolio photos, repeated to cover all 12 entries — swap each with real client imagery.
const PORTFOLIO_IMAGES = [
  "/images/portfolio-1.jpg",
  "/images/portfolio-2.jpg",
  "/images/portfolio-3.jpg",
  "/images/portfolio-4.jpg",
  "/images/portfolio-5.jpg",
  "/images/portfolio-6.jpg",
];
const portfolioImage = (i: number) => PORTFOLIO_IMAGES[i % PORTFOLIO_IMAGES.length];

export const PORTFOLIO: PortfolioItem[] = [
  { id: "aisha-rohan", title: "Aisha & Rohan", category: "Wedding", location: "Udaipur Palace", hue: 38, hue2: 6, image: portfolioImage(0) },
  { id: "meera-arjun", title: "Meera & Arjun", category: "Pre Wedding", location: "Santorini", hue: 205, hue2: 38, image: portfolioImage(1) },
  { id: "sana-vikram", title: "Sana & Vikram", category: "Engagement", location: "Jaipur", hue: 330, hue2: 38, image: portfolioImage(2) },
  { id: "little-aarav", title: "Little Aarav", category: "Baby Shoot", location: "Studio One", hue: 28, hue2: 180, image: portfolioImage(3) },
  { id: "expecting-joy", title: "Expecting Joy", category: "Maternity", location: "Golden Hour Fields", hue: 45, hue2: 320, image: portfolioImage(4) },
  { id: "kanya-daan", title: "Kanya Daan", category: "Traditional", location: "Chennai", hue: 12, hue2: 45, image: portfolioImage(5) },
  { id: "stolen-glances", title: "Stolen Glances", category: "Candid", location: "Goa Shores", hue: 190, hue2: 30, image: portfolioImage(6) },
  { id: "above-the-vows", title: "Above the Vows", category: "Drone", location: "Kerala Backwaters", hue: 160, hue2: 40, image: portfolioImage(7) },
  { id: "couture-noir", title: "Couture Noir", category: "Fashion", location: "Mumbai", hue: 270, hue2: 40, image: portfolioImage(8) },
  { id: "maison-dor", title: "Maison d'Or", category: "Commercial", location: "Dubai", hue: 42, hue2: 220, image: portfolioImage(9) },
  { id: "riya-kabir", title: "Riya & Kabir", category: "Wedding", location: "Lake Como", hue: 215, hue2: 42, image: portfolioImage(10) },
  { id: "desert-serenade", title: "Desert Serenade", category: "Pre Wedding", location: "Jaisalmer Dunes", hue: 32, hue2: 265, image: portfolioImage(11) },
];

export const SERVICES = [
  { title: "Wedding", desc: "Full-day cinematic coverage of your ceremony, crafted frame by frame.", glyph: "rings" },
  { title: "Destination Wedding", desc: "We travel the world to tell your story where it unfolds.", glyph: "globe" },
  { title: "Engagement", desc: "The first chapter, photographed with quiet elegance.", glyph: "heart" },
  { title: "Candid Photography", desc: "Unposed. Unscripted. The truth of the moment.", glyph: "eye" },
  { title: "Drone Coverage", desc: "Sweeping aerial cinematography for scale and grandeur.", glyph: "drone" },
  { title: "Cinematic Film", desc: "A wedding film with the soul of cinema.", glyph: "film" },
  { title: "Traditional Photography", desc: "Heritage, ritual and family — honoured beautifully.", glyph: "temple" },
  { title: "Live Streaming", desc: "Broadcast your day in cinematic quality, worldwide.", glyph: "signal" },
  { title: "Album Design", desc: "Hand-bound fine-art albums, designed like monographs.", glyph: "book" },
  { title: "Instant Printing", desc: "Gallery-grade prints delivered during the celebration.", glyph: "print" },
];

export const STATS = [
  { value: 1000, suffix: "+", label: "Weddings" },
  { value: 5, suffix: "+", label: "Years" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 50, suffix: "+", label: "Destinations" },
];

// reuses the same 6 sample photos as the portfolio, offset so the mix feels different by the time visitors scroll here
export const FILMS = [
  { title: "The Palace Vows", tag: "Feature Film", runtime: "4:12", hue: 38, image: portfolioImage(3) },
  { title: "Monsoon Serenade", tag: "Teaser", runtime: "1:08", hue: 200, image: portfolioImage(4) },
  { title: "Two Tides", tag: "Feature Film", runtime: "5:47", hue: 175, image: portfolioImage(5) },
  { title: "Gold Hour", tag: "Highlight", runtime: "2:31", hue: 45, image: portfolioImage(0) },
  { title: "Midnight Mandap", tag: "Feature Film", runtime: "6:02", hue: 280, image: portfolioImage(1) },
  { title: "First Light", tag: "Teaser", runtime: "0:59", hue: 15, image: portfolioImage(2) },
];

export const TESTIMONIALS = [
  { name: "Ananya & Dev", text: "Watching our film felt like watching cinema. We cried, we laughed — it was us, but magic.", initial: "A" },
  { name: "Priya S.", text: "Every single frame looks like a painting. Miracle Clickz doesn't take photos, they compose art.", initial: "P" },
  { name: "Rahul & Nisha", text: "They were invisible on the day and unforgettable in the result. True professionals.", initial: "R" },
  { name: "Kavya M.", text: "Our destination wedding in Bali was captured beyond anything we imagined possible.", initial: "K" },
  { name: "Aditya & Sara", text: "The drone shots of our haldi gave everyone goosebumps. Worth every rupee.", initial: "S" },
  { name: "Ishaan T.", text: "From the first call to the final album — pure luxury service. Five stars is not enough.", initial: "I" },
];

export const PROCESS = [
  { step: "Book", desc: "A conversation over coffee. We listen to your story first." },
  { step: "Plan", desc: "Locations, light, moments — choreographed like a film shoot." },
  { step: "Shoot", desc: "We disappear into your day and capture its truth." },
  { step: "Edit", desc: "Colour, grain and score — graded like cinema." },
  { step: "Deliver", desc: "A masterpiece, hand-delivered. Yours forever." },
];

export const AWARDS = [
  { title: "Wedding Photographer of the Year", org: "WPJA International", year: "2025" },
  { title: "Best Cinematic Film", org: "Asian Wedding Awards", year: "2024" },
  { title: "Top 30 Under 30", org: "Wedding Sutra", year: "2024" },
  { title: "Editor's Choice", org: "Fearless Photographers", year: "2023" },
];

export const FAQS = [
  { q: "How far in advance should we book?", a: "For peak wedding season we recommend 6–12 months in advance. Destination weddings ideally 12 months out, so travel and permits are choreographed early." },
  { q: "Do you travel for destination weddings?", a: "Yes — we've filmed across 50+ destinations from Udaipur to Lake Como. Travel is quoted transparently within your package." },
  { q: "When do we receive our photos and film?", a: "A curated preview arrives within 72 hours. The complete gallery in 3–4 weeks, and your cinematic film within 6–8 weeks, individually colour-graded." },
  { q: "What does a typical wedding package include?", a: "Two cinematographers, two photographers, drone coverage, a feature film, a teaser, the full edited gallery and a fine-art album. Every package is tailored." },
  { q: "Can we request specific styles or references?", a: "Absolutely. We build a visual treatment for every couple — mood boards, colour palettes and shot lists — before the first frame is shot." },
  { q: "How do payments work?", a: "30% reserves your date, 40% before the wedding, and the balance on delivery. We accept bank transfer, UPI and all major cards." },
];

export const INSTAGRAM = [
  { hue: 40, h: "tall", likes: "12.4k", image: "/images/gallery-1.jpg" },
  { hue: 200, h: "short", likes: "8.1k", image: "/images/gallery-2.jpg" },
  { hue: 330, h: "mid", likes: "15.2k", image: "/images/gallery-3.jpg" },
  { hue: 170, h: "short", likes: "6.7k", image: "/images/gallery-4.jpg" },
  { hue: 25, h: "mid", likes: "21.9k", image: "/images/gallery-5.jpg" },
  { hue: 270, h: "tall", likes: "9.3k", image: "/images/gallery-6.jpg" },
  { hue: 45, h: "short", likes: "11.5k", image: "/images/gallery-7.jpg" },
  { hue: 210, h: "mid", likes: "7.8k", image: "/images/gallery-8.jpg" },
];
