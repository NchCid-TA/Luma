import { useEffect, useState } from "react";

const LINKS = [
  { label: "Trabajo", href: "#work" },
  { label: "Servicios", href: "#services" },
  { label: "Nosotros", href: "#about" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[70] transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl bg-ink/85 border-b border-white/10" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          onClick={handleNav("#top")}
          data-cursor="hover"
          className="font-display font-extrabold text-lg tracking-tight text-paper"
        >
          LUMA
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={handleNav(l.href)}
                data-cursor="hover"
                className="underline-anim text-[13px] tracking-wide text-paper/80 hover:text-paper transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={handleNav("#contact")}
          data-cursor="hover"
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[13px] tracking-wide text-paper hover:border-violet-bright hover:text-violet-soft hover:bg-violet/10 transition-all duration-300"
        >
          Hablemos <span aria-hidden>&rarr;</span>
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          data-cursor="hover"
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Abrir menú"
        >
          <span className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-ink/95 backdrop-blur-xl border-b border-white/10`}
      >
        <ul className="flex flex-col px-6 py-6 gap-5">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={handleNav(l.href)} className="text-xl font-display font-medium text-paper">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
