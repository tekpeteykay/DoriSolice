// A small set of hand-built, on-brand SVG illustrations used in place of
// stock photography. They're deliberately abstract/geometric — built from
// the same navy/slate/red/lilac palette as the rest of the design system —
// rather than photographic or document-like imagery.

function GradientDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BA0A0C" />
        <stop offset="55%" stopColor="#9C7FA8" />
        <stop offset="100%" stopColor="#3E749A" />
      </linearGradient>
    </defs>
  );
}

export function IllustrationDocuments({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <GradientDefs id="docs-grad" />
      <rect x="28" y="18" width="120" height="100" rx="14" fill="#7697AA" fillOpacity="0.18" />
      <rect x="48" y="34" width="120" height="100" rx="14" fill="#00385B" fillOpacity="0.9" />
      <rect x="64" y="52" width="70" height="8" rx="4" fill="white" fillOpacity="0.9" />
      <rect x="64" y="68" width="88" height="6" rx="3" fill="white" fillOpacity="0.45" />
      <rect x="64" y="80" width="88" height="6" rx="3" fill="white" fillOpacity="0.45" />
      <rect x="64" y="92" width="60" height="6" rx="3" fill="white" fillOpacity="0.45" />
      <circle cx="150" cy="112" r="22" fill="url(#docs-grad)" />
      <path d="M141 112.5l6 6 12-13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function IllustrationCalculator({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <GradientDefs id="calc-grad" />
      <rect x="40" y="14" width="100" height="132" rx="18" fill="#00385B" />
      <rect x="56" y="30" width="68" height="28" rx="8" fill="url(#calc-grad)" />
      <g fill="white" fillOpacity="0.85">
        <rect x="56" y="70" width="14" height="14" rx="4" />
        <rect x="76" y="70" width="14" height="14" rx="4" />
        <rect x="96" y="70" width="14" height="14" rx="4" />
        <rect x="116" y="70" width="14" height="14" rx="4" />
        <rect x="56" y="90" width="14" height="14" rx="4" />
        <rect x="76" y="90" width="14" height="14" rx="4" />
        <rect x="96" y="90" width="14" height="14" rx="4" />
        <rect x="56" y="110" width="14" height="14" rx="4" />
        <rect x="76" y="110" width="14" height="14" rx="4" />
        <rect x="96" y="110" width="14" height="14" rx="4" />
      </g>
      <rect x="116" y="90" width="14" height="34" rx="7" fill="url(#calc-grad)" />
      <circle cx="164" cy="40" r="24" fill="#BA0A0C" fillOpacity="0.12" />
      <circle cx="176" cy="120" r="16" fill="#7697AA" fillOpacity="0.25" />
    </svg>
  );
}

export function IllustrationPassport({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <GradientDefs id="passport-grad" />
      <rect x="30" y="20" width="110" height="120" rx="16" fill="#7697AA" fillOpacity="0.2" transform="rotate(-6 85 80)" />
      <rect x="55" y="16" width="110" height="128" rx="16" fill="url(#passport-grad)" />
      <circle cx="110" cy="60" r="20" fill="white" fillOpacity="0.9" />
      <path d="M110 46a14 14 0 100 28 14 14 0 000-28zm0 4a4 4 0 110 20 10 10 0 010-20z" fill="#00385B" fillOpacity="0.8" />
      <rect x="76" y="92" width="68" height="7" rx="3.5" fill="white" fillOpacity="0.85" />
      <rect x="76" y="106" width="50" height="6" rx="3" fill="white" fillOpacity="0.55" />
      <rect x="76" y="118" width="58" height="6" rx="3" fill="white" fillOpacity="0.55" />
    </svg>
  );
}

export function IllustrationFamily({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <GradientDefs id="family-grad" />
      <circle cx="80" cy="70" r="34" fill="#00385B" />
      <circle cx="130" cy="70" r="34" fill="url(#family-grad)" fillOpacity="0.9" />
      <circle cx="80" cy="58" r="12" fill="white" fillOpacity="0.85" />
      <path d="M58 96c2-14 12-22 22-22s20 8 22 22" stroke="white" strokeOpacity="0.85" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="130" cy="58" r="12" fill="white" fillOpacity="0.85" />
      <path d="M108 96c2-14 12-22 22-22s20 8 22 22" stroke="white" strokeOpacity="0.85" strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="105" cy="118" r="18" fill="#BA0A0C" fillOpacity="0.85" />
      <circle cx="105" cy="110" r="7" fill="white" fillOpacity="0.9" />
      <path d="M92 128c1-8 6-13 13-13s12 5 13 13" stroke="white" strokeOpacity="0.9" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function IllustrationGrowth({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <GradientDefs id="growth-grad" />
      <rect x="30" y="100" width="24" height="40" rx="6" fill="#7697AA" fillOpacity="0.35" />
      <rect x="66" y="76" width="24" height="64" rx="6" fill="#00385B" />
      <rect x="102" y="52" width="24" height="88" rx="6" fill="url(#growth-grad)" />
      <rect x="138" y="30" width="24" height="110" rx="6" fill="#BA0A0C" />
      <path d="M30 90 L66 60 L102 44 L162 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 10" fill="none" />
      <circle cx="162" cy="20" r="8" fill="white" />
    </svg>
  );
}

export function IllustrationChat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <GradientDefs id="chat-grad" />
      <rect x="24" y="24" width="110" height="70" rx="20" fill="#00385B" />
      <path d="M50 94l-4 22 26-22" fill="#00385B" />
      <rect x="56" y="44" width="62" height="7" rx="3.5" fill="white" fillOpacity="0.8" />
      <rect x="56" y="60" width="42" height="7" rx="3.5" fill="white" fillOpacity="0.5" />
      <rect x="76" y="70" width="100" height="66" rx="20" fill="url(#chat-grad)" />
      <path d="M158 136l6 20-28-20" fill="url(#chat-grad)" />
      <rect x="96" y="90" width="60" height="7" rx="3.5" fill="white" fillOpacity="0.9" />
      <rect x="96" y="106" width="44" height="7" rx="3.5" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

export function BlobBackdrop({ className }: { className?: string }) {
  return <div className={className} aria-hidden />;
}
