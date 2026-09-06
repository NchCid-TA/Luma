import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/scroll";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const btnRef = useRef(null);
  const headlineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const btn = btnRef.current;
    if (!btn || window.matchMedia("(pointer: coarse)").matches) return;

    const moveX = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
    const moveY = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      moveX(relX * 0.35);
      moveY(relY * 0.35);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-ink overflow-hidden py-32 md:py-44 px-6"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[70vmax] h-[70vmax] rounded-full bg-violet/[0.07] blur-[140px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        <p className="eyebrow text-violet-soft mb-8">Hablemos</p>

        <h2 ref={headlineRef} className="display-type text-paper text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-14">
          Hagamos que
          <br />
          algo se mueva.
        </h2>

        <a
          ref={btnRef}
          href="mailto:hello@luma.studio"
          data-cursor="hover"
          className="glass group relative inline-flex items-center gap-3 rounded-full px-10 py-5 text-paper text-lg md:text-xl transition-shadow duration-300 hover:shadow-[0_0_60px_-10px_rgba(109,74,255,0.55)]"
        >
          <span>hello@luma.studio</span>
          <span
            aria-hidden
            className="grid place-items-center w-8 h-8 rounded-full bg-violet transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            &#8599;
          </span>
        </a>

        <div className="mt-16 flex items-center gap-8">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="underline-anim text-sm tracking-wide text-paper/50 hover:text-paper transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
