const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-white/10 px-6 md:px-10 py-10">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="font-display font-extrabold text-lg tracking-tight text-paper mb-1">LUMA</p>
          <p className="text-sm text-paper/40 font-light">Gijón, Asturias — estudio creativo de marketing</p>
        </div>

        <div className="flex items-center gap-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="underline-anim text-xs tracking-wide text-paper/45 hover:text-paper transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-xs text-paper/30 font-light">&copy; {new Date().getFullYear()} LUMA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
