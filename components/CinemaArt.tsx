"use client";

/**
 * Generated cinematic still — a fully offline, luxury placeholder "photograph".
 * Duotone gradient scene with bokeh light, horizon glow and vignette.
 * Swap with real imagery by replacing this component's root with an <img/video>.
 */
export default function CinemaArt({
  hue,
  hue2,
  seed = 3,
  className = "",
  image,
}: {
  hue: number;
  hue2: number;
  seed?: number;
  className?: string;
  image?: string;
}) {
  const bokeh = Array.from({ length: 7 }, (_, i) => {
    const n = Math.sin(seed * 37.7 + i * 91.3) * 0.5 + 0.5;
    const m = Math.cos(seed * 17.3 + i * 53.7) * 0.5 + 0.5;
    return {
      left: `${(8 + n * 84).toFixed(2)}%`,
      top: `${(6 + m * 70).toFixed(2)}%`,
      size: `${14 + ((i * 7 + seed * 3) % 5) * 16}px`,
      opacity: Number((0.12 + n * 0.22).toFixed(3)),
      delay: `${(-i * 1.3).toFixed(1)}s`,
    };
  });

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        image
          ? undefined
          : {
              background: `
          radial-gradient(120% 90% at 50% 105%, hsla(${hue}, 62%, 46%, 0.5), transparent 55%),
          radial-gradient(90% 70% at 78% 20%, hsla(${hue2}, 55%, 40%, 0.35), transparent 60%),
          linear-gradient(178deg, hsl(${hue2}, 28%, 7%) 0%, hsl(${hue}, 32%, 11%) 55%, hsl(${hue}, 45%, 16%) 100%)
        `,
            }
      }
      aria-hidden="true"
    >
      {/* sample demo photo — replace `image` in lib/data.ts with real client imagery */}
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* colour-grade wash so photos still read as part of the gold/duotone scene */}
          <div
            className="absolute inset-0 mix-blend-color"
            style={{
              background: `linear-gradient(178deg, hsl(${hue2}, 45%, 30%) 0%, hsl(${hue}, 50%, 40%) 100%)`,
              opacity: 0.35,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(120% 90% at 50% 105%, hsla(${hue}, 62%, 30%, 0.35), transparent 55%)`,
            }}
          />
        </>
      )}
      {/* horizon glow */}
      <div
        className="absolute inset-x-0 bottom-[26%] h-px"
        style={{
          background: `linear-gradient(90deg, transparent, hsla(${hue}, 80%, 68%, 0.55), transparent)`,
          boxShadow: `0 0 32px 6px hsla(${hue}, 80%, 60%, 0.28)`,
        }}
      />
      {/* bokeh */}
      {bokeh.map((b, i) => (
        <span
          key={i}
          className="float-slow absolute rounded-full"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            animationDelay: b.delay,
            background: `radial-gradient(circle, hsla(${
              i % 2 ? hue : hue2
            }, 85%, 75%, 0.9), transparent 70%)`,
            filter: "blur(1px)",
          }}
        />
      ))}
      {/* film vignette + grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.65) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
