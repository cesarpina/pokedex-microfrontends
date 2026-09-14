export function Pokeball({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <defs>
        <linearGradient id="pokeball-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="url(#pokeball-gradient)" />
      <path d="M2 32h60" stroke="var(--ink)" strokeWidth="6" />
      <circle cx="32" cy="32" r="10" fill="var(--surface)" stroke="var(--ink)" strokeWidth="6" />
    </svg>
  )
}
