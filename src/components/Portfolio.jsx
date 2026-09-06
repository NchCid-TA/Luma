import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/scroll";
import { PROJECTS } from "../data/projects";

function ProjectSection({ project, index, total }) {
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const wrapRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scale: 1.18 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[92vh] md:h-screen w-full overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={project.image ? {} : { background: project.gradient }}
      >
        {project.image ? (
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        ) : (
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(115deg, transparent 0 2px, rgba(255,255,255,0.4) 2px 3px)",
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/10" />
      </div>

      <div ref={contentRef} className="absolute inset-0 flex flex-col justify-between p-6 md:p-12">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-paper/40">
            {project.concept ? "Proyecto conceptual" : "Proyecto"}
          </span>
          <span className="eyebrow text-paper/40">
            0{index + 1} / 0{total}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h3 className="display-type text-paper text-5xl sm:text-6xl md:text-8xl">{project.name}</h3>
          <div className="flex flex-col gap-3 md:items-end md:mb-3">
            <p className="eyebrow text-violet-soft">{project.category}</p>
            {project.links?.length > 0 && (
              <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
                {project.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="underline-anim text-xs tracking-wide text-paper/60 hover:text-paper transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative bg-ink">
      <div ref={headerRef} className="px-6 md:px-10 pt-28 pb-14 md:pt-36 md:pb-20 max-w-3xl">
        <p className="eyebrow text-violet-soft mb-6">Trabajo seleccionado</p>
        <h2 className="display-type text-paper text-4xl sm:text-5xl md:text-6xl">
          Ideas, construidas hasta que se mueven.
        </h2>
      </div>

      {PROJECTS.map((p, i) => (
        <ProjectSection key={p.name} project={p} index={i} total={PROJECTS.length} />
      ))}
    </section>
  );
}
