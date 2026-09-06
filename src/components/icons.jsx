// Minimal abstract line-glyphs — interpretations, not brand logos.

export function IconAperture(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="6" y="6" width="52" height="52" rx="16" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="43" cy="21" r="2" fill="currentColor" />
    </svg>
  );
}

export function IconWave(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M20 44V22a10 10 0 0 1 10-10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="20" cy="44" r="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M30 14c2 6 7.5 10 14 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlay(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect x="6" y="6" width="52" height="52" rx="20" stroke="currentColor" strokeWidth="1.4" />
      <path d="M27 22.5v19l16-9.5-16-9.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHeart(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20.2S3 14.6 3 8.7A4.7 4.7 0 0 1 12 6a4.7 4.7 0 0 1 9 2.7c0 5.9-9 11.5-9 11.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconComment(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 12a8 8 0 1 1 3.2 6.4L4 19.5l1.1-3A7.96 7.96 0 0 1 4 12Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconShare(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 15.5 18 8m0 0-5.5-1M18 8l-1 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
