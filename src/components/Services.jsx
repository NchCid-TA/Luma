import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/scroll";

const SERVICES = [
  {
    index: "01",
    name: "Redes Sociales",
    desc: "Feeds pensados para ser vistos, no para pasar de largo.",
    Visual: VisualSocial,
  },
  {
    index: "02",
    name: "Branding",
    desc: "Sistemas de identidad que aguantan a cualquier tamaño y velocidad.",
    Visual: VisualBranding,
  },
  {
    index: "03",
    name: "Contenido",
    desc: "Foto y vídeo con un punto de vista propio.",
    Visual: VisualContent,
  },
  {
    index: "04",
    name: "Publicidad",
    desc: "Inversión que se acumula, no solo clics.",
    Visual: VisualPaidMedia,
  },
  {
    index: "05",
    name: "Estrategia",
    desc: "Una sola dirección, todos los canales apuntando hacia ella.",
    Visual: VisualStrategy,
  },
];

function VisualSocial({ active }) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-2xl"
          style={{
            background: i === 4 ? "var(--color-violet)" : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            transform: active ? "scale(1)" : "scale(0.85)",
            opacity: active ? 1 : 0,
            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`,
          }}
        />
      ))}
    </div>
  );
}

function VisualBranding({ active }) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${70 + i * 60}px`,
            height: `${70 + i * 60}px`,
            borderColor: i === 0 ? "var(--color-violet)" : "rgba(255,255,255,0.15)",
            borderWidth: i === 0 ? 2 : 1,
            transform: active ? "scale(1) rotate(0deg)" : "scale(0.6) rotate(-30deg)",
            opacity: active ? 1 : 0,
            transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
          }}
        />
      ))}
      <div
        className="absolute w-6 h-6 rounded-full bg-violet-soft"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.6s 0.3s" }}
      />
    </div>
  );
}

function VisualContent({ active }) {
  const rotations = [-14, -5, 5, 14];
  return (
    <div className="relative w-64 h-48 flex items-center justify-center">
      {rotations.map((r, i) => (
        <div
          key={i}
          className="absolute w-40 h-24 rounded-xl border border-white/15"
          style={{
            background:
              i === 1 || i === 2
                ? "linear-gradient(155deg, rgba(109,74,255,0.35), rgba(11,10,15,0.4))"
                : "rgba(255,255,255,0.04)",
            transform: active ? `rotate(${r}deg) translateY(0)` : `rotate(${r}deg) translateY(30px)`,
            opacity: active ? 1 : 0,
            transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

function VisualPaidMedia({ active }) {
  const heights = [30, 55, 40, 75, 50];
  return (
    <div className="flex items-end gap-3 h-40">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-6 rounded-full"
          style={{
            height: active ? `${h}%` : "6%",
            background: i === 3 ? "linear-gradient(180deg, var(--color-violet-soft), var(--color-violet))" : "rgba(255,255,255,0.12)",
            transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
          }}
        />
      ))}
    </div>
  );
}

function VisualStrategy({ active }) {
  const points = [
    [20, 20],
    [90, 10],
    [10, 90],
    [95, 85],
    [55, 50],
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-64 h-64">
      {points.map(([x, y], i) =>
        i === points.length - 1
          ? null
          : (
              <line
                key={`l-${i}`}
                x1={x}
                y1={y}
                x2={55}
                y2={50}
                stroke="rgba(201,191,255,0.35)"
                strokeWidth="0.5"
                style={{
                  strokeDasharray: 120,
                  strokeDashoffset: active ? 0 : 120,
                  transition: `stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
                }}
              />
            )
      )}
      {points.map(([x, y], i) => (
        <circle
          key={`c-${i}`}
          cx={x}
          cy={y}
          r={i === points.length - 1 ? 4 : 2.4}
          fill={i === points.length - 1 ? "var(--color-violet-soft)" : "rgba(255,255,255,0.5)"}
          style={{
            opacity: active ? 1 : 0,
            transformOrigin: `${x}px ${y}px`,
            transform: active ? "scale(1)" : "scale(0.3)",
            transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s`,
          }}
        />
      ))}
    </svg>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const textRefs = useRef([]);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stickyRef.current,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const step = Math.min(SERVICES.length - 1, Math.floor(self.progress * SERVICES.length));
          setActive(step);
        },
      });

      textRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${(i / SERVICES.length) * 100}% top`,
              end: `${((i + 0.6) / SERVICES.length) * 100}% top`,
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-ink"
      style={{ height: `${SERVICES.length * 100}vh` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto max-w-[1400px] h-full px-6 md:px-10 flex flex-col md:flex-row items-stretch gap-6 md:gap-10 py-24 md:py-0">
          <div className="relative flex-1 order-2 md:order-1 min-h-[260px] md:min-h-0">
            <p className="eyebrow text-violet-soft absolute top-0 left-0 hidden md:block">Qué hacemos</p>
            {SERVICES.map((s, i) => (
              <div
                key={s.name}
                className="absolute inset-0 flex flex-col justify-center"
                style={{ opacity: active === i ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: active === i ? "auto" : "none" }}
              >
                <span className="text-sm text-paper/40 font-light mb-3">{s.index} / 0{SERVICES.length}</span>
                <h3 className="display-type text-5xl md:text-6xl lg:text-7xl text-paper mb-6">{s.name}</h3>
                <p className="text-base md:text-lg text-paper/55 font-light max-w-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative flex-1 order-1 md:order-2 min-h-[240px] md:min-h-0 flex items-center justify-center">
            {SERVICES.map((s, i) => (
              <div key={s.name} className="absolute inset-0 flex items-center justify-center">
                <s.Visual active={active === i} />
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-6 md:left-10 flex items-center gap-2.5">
          {SERVICES.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: active === i ? 22 : 6,
                background: active === i ? "var(--color-violet-soft)" : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
