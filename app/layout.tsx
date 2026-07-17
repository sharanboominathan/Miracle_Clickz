import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miracleclickz.com"),
  title: {
    default: "Miracle Clickz — Cinematic Wedding Photography & Films",
    template: "%s — Miracle Clickz",
  },
  description:
    "Miracle Clickz crafts cinematic wedding stories — luxury wedding photography, films, drone coverage and destination weddings. Every love story deserves a masterpiece.",
  keywords: [
    "luxury wedding photography",
    "cinematic wedding films",
    "destination wedding photographer",
    "candid wedding photography",
    "pre-wedding shoot",
    "Miracle Clickz",
  ],
  openGraph: {
    title: "Miracle Clickz — Cinematic Wedding Stories",
    description:
      "Luxury wedding photography and cinematic films. Every love story deserves a masterpiece.",
    type: "website",
    locale: "en_US",
    siteName: "Miracle Clickz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miracle Clickz — Cinematic Wedding Stories",
    description:
      "Luxury wedding photography and cinematic films. Every love story deserves a masterpiece.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Miracle Clickz",
  description:
    "Luxury cinematic wedding photography and film studio. Weddings, destination weddings, pre-wedding shoots, drone coverage and cinematic films.",
  slogan: "Every Love Story Deserves a Masterpiece",
  priceRange: "$$$",
  areaServed: "Worldwide",
  knowsAbout: [
    "Wedding Photography",
    "Cinematic Wedding Films",
    "Destination Weddings",
    "Drone Coverage",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* apply saved theme before paint to avoid a flash */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('mc-theme')==='light')document.documentElement.classList.add('light')}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
