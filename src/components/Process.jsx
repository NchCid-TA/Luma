import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/scroll";

const STAGES = [
  { index: "01", name: "Descubrir", desc: "Estudiamos el mercado, la audiencia y el hueco." },
  { index: "02", name: "Definir", desc: "Una posición clara. Una promesa clara." },
  { index: "03", name: "Crear", desc: "Identidad, contenido y mensaje, construidos juntos." },
  { index: "04", name: "Lanzar", desc: "Al mundo, en cada canal que importa." },
  { index: "05", name: "Crecer", desc: "Medido, afinado y multiplicado con el tiempo." },
];

function StageMark({ step }) {
  return (
    <svg viewBox="0 0 200 200" className="w-56 h-56 md:w-72 md:h-72">
      {/* 01 discover — pulsing point with radar ring */}
      <g style={{ opacity: step === 0 ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <circle cx="100" cy="100" r="6" fill="var(--color-violet)" />
        <circle
          cx="100"
          cy="100"
          r={step === 0 ? 40 : 6}
          fill="none"
          stroke="rgba(61,42,153,0.35)"
          strokeWidth="1"
          style={{ transition: "r 1.4s ease-out" }}
        />
      </g>

      {/* 02 define — two points, one line */}
      <g style={{ opacity: step === 1 ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <line x1="72" y1="100" x2="128" y2="100" stroke="rgba(11,10,15,0.25)" strokeWidth="1" />
        <circle cx="72" cy="100" r="5" fill="rgba(11,10,15,0.5)" />
        <circle cx="128" cy="100" r="5" fill="var(--color-violet)" />
      </g>

      {/* 03 create — small structure */}
      <g style={{ opacity: step === 2 ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <polygon points="100,64 136,130 64,130" fill="none" stroke="rgba(11,10,15,0.25)" strokeWidth="1" />
        <circle cx="100" cy="64" r="5" fill="var(--color-violet)" />
        <circle cx="136" cy="130" r="5" fill="rgba(11,10,15,0.5)" />
        <circle cx="64" cy="130" r="5" fill="rgba(11,10,15,0.5)" />
      </g>

      {/* 04 launch — burst */}
      <g style={{ opacity: step === 3 ? 1 : 0, transition: "opacity 0.6s ease" }}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x2 = 100 + Math.cos(angle) * (step === 3 ? 54 : 10);
          const y2 = 100 + Math.sin(angle) * (step === 3 ? 54 : 10);
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke={i % 2 === 0 ? "var(--color-violet)" : "rgba(11,10,15,0.25)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}
            />
          );
        })}
      </g>

      {/* 05 grow — resolved mark */}
      <g style={{ opacity: step === 4 ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <rect
          x="60"
          y="60"
          width="80"
          height="80"
          rx="24"
          fill="none"
          stroke="var(--color-violet)"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="100" r="10" fill="var(--color-violet)" />
      </g>
    </svg>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [step, setStep] = useState(0);

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
          const s = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
          setStep(s);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper text-ink"
      style={{ height: `${STAGES.length * 100}vh` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="mx-auto max-w-[1400px] h-full px-6 md:px-10 flex flex-col justify-center gap-10 md:gap-0 md:flex-row md:items-center py-20 md:py-0">
          <div className="md:flex-1">
            <p className="eyebrow text-violet-deep mb-4 md:mb-8">El Método LUMA</p>
            <ul className="flex flex-col gap-2 md:gap-4">
              {STAGES.map((s, i) => (
                <li key={s.name} className="flex items-baseline gap-4 md:gap-6">
                  <span
                    className="text-sm font-light transition-colors duration-500"
                    style={{ color: step === i ? "var(--color-violet)" : "rgba(11,10,15,0.3)" }}
                  >
                    {s.index}
                  </span>
                  <div>
                    <p
                      className="display-type transition-all duration-500"
                      style={{
                        fontSize: step === i ? "clamp(1.75rem, 4vw, 3rem)" : "clamp(1.25rem, 2.4vw, 1.75rem)",
                        color: step === i ? "var(--color-ink)" : "rgba(11,10,15,0.28)",
                      }}
                    >
                      {s.name}
                    </p>
                    <p
                      className="text-sm md:text-base font-light overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: step === i ? "3rem" : "0",
                        opacity: step === i ? 1 : 0,
                        color: "rgba(11,10,15,0.55)",
                      }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:flex-1 flex items-center justify-center">
            <StageMark step={step} />
          </div>
        </div>
      </div>
    </section>
  );
}
