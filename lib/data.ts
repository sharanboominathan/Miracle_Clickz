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

export const PORTFOLIO: PortfolioItem[] = [
  { id: "aisha-rohan", title: "Aisha & Rohan", category: "Wedding", location: "Udaipur Palace", hue: 38, hue2: 6, image: "https://picsum.photos/id/1011/900/1200" },
  { id: "meera-arjun", title: "Meera & Arjun", category: "Pre Wedding", location: "Santorini", hue: 205, hue2: 38, image: "https://picsum.photos/id/1015/900/1200" },
  { id: "sana-vikram", title: "Sana & Vikram", category: "Engagement", location: "Jaipur", hue: 330, hue2: 38, image: "https://picsum.photos/id/1016/900/1200" },
  { id: "little-aarav", title: "Little Aarav", category: "Baby Shoot", location: "Studio One", hue: 28, hue2: 180, image: "https://picsum.photos/id/1018/900/1200" },
  { id: "expecting-joy", title: "Expecting Joy", category: "Maternity", location: "Golden Hour Fields", hue: 45, hue2: 320, image: "https://picsum.photos/id/1024/900/1200" },
  { id: "kanya-daan", title: "Kanya Daan", category: "Traditional", location: "Chennai", hue: 12, hue2: 45, image: "https://picsum.photos/id/1027/900/1200" },
  { id: "stolen-glances", title: "Stolen Glances", category: "Candid", location: "Goa Shores", hue: 190, hue2: 30, image: "https://picsum.photos/id/1035/900/1200" },
  { id: "above-the-vows", title: "Above the Vows", category: "Drone", location: "Kerala Backwaters", hue: 160, hue2: 40, image: "https://picsum.photos/id/1040/900/1200" },
  { id: "couture-noir", title: "Couture Noir", category: "Fashion", location: "Mumbai", hue: 270, hue2: 40, image: "https://picsum.photos/id/1043/900/1200" },
  { id: "maison-dor", title: "Maison d'Or", category: "Commercial", location: "Dubai", hue: 42, hue2: 220, image: "https://picsum.photos/id/1047/900/1200" },
  { id: "riya-kabir", title: "Riya & Kabir", category: "Wedding", location: "Lake Como", hue: 215, hue2: 42, image: "https://picsum.photos/id/1050/900/1200" },
  { id: "desert-serenade", title: "Desert Serenade", category: "Pre Wedding", location: "Jaisalmer Dunes", hue: 32, hue2: 265, image: "https://picsum.photos/id/1056/900/1200" },
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

export const FILMS = [
  { title: "The Palace Vows", tag: "Feature Film", runtime: "4:12", hue: 38, image: "https://picsum.photos/id/1060/900/1350" },
  { title: "Monsoon Serenade", tag: "Teaser", runtime: "1:08", hue: 200, image: "https://picsum.photos/id/1062/900/1350" },
  { title: "Two Tides", tag: "Feature Film", runtime: "5:47", hue: 175, image: "https://picsum.photos/id/1067/900/1350" },
  { title: "Gold Hour", tag: "Highlight", runtime: "2:31", hue: 45, image: "https://picsum.photos/id/1074/900/1350" },
  { title: "Midnight Mandap", tag: "Feature Film", runtime: "6:02", hue: 280, image: "https://picsum.photos/id/1080/900/1350" },
  { title: "First Light", tag: "Teaser", runtime: "0:59", hue: 15, image: "https://picsum.photos/id/1084/900/1350" },
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
  { hue: 40, h: "tall", likes: "12.4k", image: "https://picsum.photos/id/1003/700/1000" },
  { hue: 200, h: "short", likes: "8.1k", image: "https://picsum.photos/id/1005/700/700" },
  { hue: 330, h: "mid", likes: "15.2k", image: "https://picsum.photos/id/1008/700/850" },
  { hue: 170, h: "short", likes: "6.7k", image: "https://picsum.photos/id/1012/700/700" },
  { hue: 25, h: "mid", likes: "21.9k", image: "https://picsum.photos/id/1013/700/850" },
  { hue: 270, h: "tall", likes: "9.3k", image: "https://picsum.photos/id/1019/700/1000" },
  { hue: 45, h: "short", likes: "11.5k", image: "https://picsum.photos/id/1021/700/700" },
  { hue: 210, h: "mid", likes: "7.8k", image: "https://picsum.photos/id/1023/700/850" },
];
