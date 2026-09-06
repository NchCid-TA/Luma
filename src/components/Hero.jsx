import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

export default function Hero() {
  const sectionRef = useRef(null);
  const blobRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const eyebrowRef = useRef(null);
  const scrollCueRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.25 }
      );
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.45 }
      );
      gsap.fromTo(
        blobRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out", delay: 0.1 }
      );

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
        .to(blobRef.current, { scale: 0.55, y: -60, opacity: 0.4, ease: "none" }, 0)
        .to(headlineRef.current, { y: -80, opacity: 0.3, ease: "none" }, 0)
        .to(subRef.current, { y: -40, opacity: 0, ease: "none" }, 0)
        .to(scrollCueRef.current, { opacity: 0, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-screen w-full overflow-hidden bg-ink flex flex-col items-center justify-center"
    >
      <div
        ref={blobRef}
        className="blob absolute w-[70vmin] h-[70vmin] opacity-0"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(201,191,255,0.9), rgba(109,74,255,0.55) 45%, rgba(61,42,153,0.25) 75%, transparent 100%)",
          filter: "blur(6px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p ref={eyebrowRef} className="eyebrow text-violet-soft mb-6">
          Gijón, Asturias — para el mundo
        </p>

        <h1
          ref={headlineRef}
          className="display-type text-paper text-[16vw] sm:text-[13vw] md:text-[9vw] lg:text-[7.5rem]"
        >
          LUMA
        </h1>

        <p ref={subRef} className="mt-6 text-xl sm:text-2xl md:text-3xl font-light text-paper/70 display-type font-medium tracking-tight">
          Marketing que mueve.
        </p>
      </div>

      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-paper/40"
      >
        <span className="eyebrow">Desliza</span>
        <span className="relative block w-px h-10 overflow-hidden bg-white/15">
          <span className="scroll-cue-bar absolute inset-x-0 top-0 h-1/2 bg-violet-soft" />
        </span>
      </div>
    </section>
  );
}
