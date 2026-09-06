import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

const WORDS = ["CREA.", "CONECTA.", "MUEVE."];

export default function About() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const wordRefs = useRef([]);
  const introRef = useRef(null);
  const outroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(wordRefs.current.slice(1), { opacity: 0, y: 24, filter: "blur(10px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      tl.to(introRef.current, { opacity: 0, y: -16, duration: 0.6 });

      wordRefs.current.forEach((word, i) => {
        if (i === 0) return;
        tl.to(
          wordRefs.current[i - 1],
          { opacity: 0, y: -24, filter: "blur(10px)", duration: 0.5 },
          "+=0.3"
        ).fromTo(
          word,
          { opacity: 0, y: 24, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5 }
        );
      });

      tl.fromTo(
        outroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 },
        "+=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-paper text-ink"
      style={{ height: "500vh" }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
        <p ref={introRef} className="eyebrow text-violet-deep mb-10 max-w-md">
          LUMA es un estudio creativo de marketing con sede en Gijón.
        </p>

        <div className="relative h-[16vw] sm:h-[13vw] md:h-[9vw] max-h-40 flex items-center justify-center">
          {WORDS.map((w, i) => (
            <span
              key={w}
              ref={(el) => (wordRefs.current[i] = el)}
              className="display-type absolute text-[16vw] sm:text-[13vw] md:text-[9vw]"
              style={{
                color: i === WORDS.length - 1 ? "var(--color-violet)" : "var(--color-ink)",
              }}
            >
              {w}
            </span>
          ))}
        </div>

        <p ref={outroRef} className="mt-10 max-w-lg text-lg md:text-xl font-light text-ink/70 opacity-0">
          Convertimos marcas en experiencias que la gente recuerda.
          <br />
          <span className="text-ink/45">Con sede en Gijón. Hecho para todo el mundo.</span>
        </p>

        <p className="mt-8 eyebrow text-ink/35">Fundada y dirigida por Julia Jiménez Fernández</p>
      </div>
    </section>
  );
}
