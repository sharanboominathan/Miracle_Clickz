"use client";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.8" cy="6.2" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/910000000000",
    icon: (
      <>
        <path d="M12 2.5A9.5 9.5 0 0 0 3.8 16.7L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5z" />
        <path d="M8.8 7.8c-.3 0-.6.1-.8.4-.9 1-.7 2.9.5 4.6 1.3 1.9 3.1 3.2 4.9 3.4 1 .1 1.9-.2 2.3-.9.2-.3.2-.7 0-.9l-1.4-1c-.2-.2-.6-.1-.8.1l-.6.6c-.8-.3-2.3-1.4-2.9-2.6l.5-.5c.2-.2.3-.6.1-.8l-.9-1.9c-.1-.3-.5-.5-.9-.5z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9.2v5.6l5-2.8-5-2.8z" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <path d="M14.5 8.5V6.8c0-.8.6-1 1-1h2V2.6h-2.8c-2.9 0-3.7 2.1-3.7 3.6v2.3H9v3.2h2v9.7h3.5v-9.7h2.6l.4-3.2h-3z" />
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@miracleclickz.com",
    icon: (
      <>
        <rect x="2" y="4.5" width="20" height="15" rx="2" />
        <path d="M2.5 6l9.5 7 9.5-7" />
      </>
    ),
  },
];

const NAV = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Story", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Films", href: "#films" },
  { label: "Process", href: "#process" },
  { label: "Book Now", href: "#book" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 pb-10 pt-20 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
        <a href="#top" className="group text-center">
          <p className="font-serif text-3xl tracking-[0.2em] text-white transition-colors duration-500 group-hover:text-gold">
            MIRACLE CLICKZ
          </p>
          <p className="mt-2 text-[9px] uppercase tracking-cine text-gold/80">
            Cinematic Wedding Stories
          </p>
        </a>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-9 gap-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[10px] uppercase tracking-wide2 text-white/40 transition-colors duration-400 hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/60 hover:text-gold hover:shadow-[0_10px_30px_-10px_rgba(214,178,94,0.4)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-2 border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] tracking-wide text-white/25">
            © {new Date().getFullYear()} Miracle Clickz. All moments reserved.
          </p>
          <p className="text-[9px] tracking-wide text-white/15">
            Crafted like cinema — frame by frame.
          </p>
        </div>
      </div>
    </footer>
  );
}
