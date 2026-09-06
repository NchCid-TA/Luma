import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../lib/scroll";
import { IconAperture, IconWave, IconPlay, IconHeart, IconComment, IconShare } from "./icons";

const PLATFORMS = [
  {
    name: "Instagram",
    line: "Feeds diseñados para detener el scroll.",
    Icon: IconAperture,
    gradient: "linear-gradient(155deg, #F58529 0%, #DD2A7B 45%, #8134AF 75%, #515BD4 100%)",
  },
  {
    name: "TikTok",
    line: "Sonido nativo, velocidad nativa.",
    Icon: IconWave,
    gradient: "linear-gradient(155deg, #0b0a0f 0%, #1a1820 55%, #25D8C9 130%)",
  },
  {
    name: "YouTube",
    line: "Contenido largo que construye confianza.",
    Icon: IconPlay,
    gradient: "linear-gradient(155deg, #1a0a0d 0%, #2b0b10 55%, #FF3B30 140%)",
  },
];

const STEPS = PLATFORMS.length + 1;
const ANGLE = 360 / PLATFORMS.length;
const RADIUS = 200;

function PlatformFace({ platform, rotation }) {
  const { name, line, Icon } = platform;
  return (
    <div
      className="absolute inset-0 rounded-[32px] border border-white/12 overflow-hidden"
      style={{
        background: platform.gradient,
        transform: `rotateY(${rotation}deg) translateZ(${RADIUS}px)`,
        backfaceVisibility: "hidden",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 30px 60px -20px rgba(0,0,0,0.7)",
      }}
    >
      <div className="absolute inset-0 bg-ink/35" />
      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>

        <div className="flex flex-col items-center text-center gap-4">
          <Icon className="w-11 h-11 text-white drop-shadow-md" />
          <h3 className="display-type text-3xl text-white">{name}</h3>
          <p className="text-sm text-white/70 font-light max-w-[220px]">{line}</p>
        </div>

        <div className="flex items-center justify-center gap-6 text-white/55">
          <IconHeart className="w-4 h-4" />
          <IconComment className="w-4 h-4" />
          <IconShare className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default function IntroSocialExperience() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const eyebrowRef = useRef(null);
  const cardWrapRef = useRef(null);
  const groupRef = useRef(null);
  const logoRef = useRef(null);
  const [active, setActive] = useState(-1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(groupRef.current, { rotateY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: stickyRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.floor(self.progress * STEPS);
            setActive(Math.min(step, STEPS - 1));
          },
        },
      });

      tl.to(eyebrowRef.current, { opacity: 0, y: -12, duration: 0.5 }, 0.15);

      PLATFORMS.forEach((_, i) => {
        if (i === PLATFORMS.length - 1) return;
        tl.to(
          groupRef.current,
          { rotateY: `-=${ANGLE}`, duration: 1, ease: "power2.inOut" },
          "+=0.55"
        );
      });

      tl.to(
        cardWrapRef.current,
        { scale: 0.55, opacity: 0, filter: "blur(10px)", duration: 0.8, ease: "power2.in" },
        "+=0.55"
      ).fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.6, filter: "blur(14px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative bg-ink"
      style={{ height: `${STEPS * 100 + 40}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[60vmax] h-[60vmax] rounded-full bg-violet/[0.06] blur-[120px]" />
        </div>

        <p
          ref={eyebrowRef}
          className="eyebrow absolute top-[16%] left-1/2 -translate-x-1/2 text-paper/40 text-center px-6"
        >
          Donde vive la atención
        </p>

        <div ref={cardWrapRef} className="relative" style={{ perspective: "1400px" }}>
          <div
            className="card-idle-float relative"
            style={{
              width: "clamp(200px, 58vw, 300px)",
              aspectRatio: "0.78",
            }}
          >
            <div
              ref={groupRef}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {PLATFORMS.map((p, i) => (
                <PlatformFace key={p.name} platform={p} rotation={i * ANGLE} />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-8 rounded-full bg-black/60 blur-xl pulse-soft" />
        </div>

        <div
          ref={logoRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0"
        >
          <span className="display-type text-6xl md:text-8xl text-paper">LUMA</span>
          <span className="eyebrow text-violet-soft">Donde se mueve la atención</span>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {Array.from({ length: STEPS }).map((_, i) => (
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
