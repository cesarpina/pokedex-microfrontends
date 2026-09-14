const blob = (color: string) => ({
  background: `radial-gradient(circle at center, ${color} 0%, transparent 65%)`,
})

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-48 -left-40 h-[40rem] w-[40rem] animate-drift rounded-full"
        style={blob('color-mix(in srgb, var(--accent) 28%, transparent)')}
      />
      <div
        className="absolute -right-40 -bottom-48 h-[44rem] w-[44rem] animate-drift rounded-full"
        style={{
          ...blob('color-mix(in srgb, var(--accent-2) 22%, transparent)'),
          animationDelay: '-9s',
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-96 w-96 animate-drift rounded-full"
        style={{
          ...blob('color-mix(in srgb, var(--accent) 12%, transparent)'),
          animationDelay: '-4s',
        }}
      />
    </div>
  )
}
