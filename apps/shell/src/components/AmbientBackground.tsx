export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-32 h-[32rem] w-[32rem] animate-drift rounded-full bg-accent/25 blur-3xl" />
      <div
        className="absolute -right-32 -bottom-40 h-[36rem] w-[36rem] animate-drift rounded-full bg-accent-2/20 blur-3xl"
        style={{ animationDelay: '-9s' }}
      />
      <div
        className="absolute top-1/3 left-1/2 h-72 w-72 animate-drift rounded-full bg-accent/10 blur-3xl"
        style={{ animationDelay: '-4s' }}
      />
    </div>
  )
}
