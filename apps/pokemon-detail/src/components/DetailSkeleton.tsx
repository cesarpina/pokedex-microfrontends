export function DetailSkeleton() {
  return (
    <div
      role="status"
      aria-label="Cargando Pokémon"
      className="grid gap-8 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="skeleton h-56 w-56 rounded-full sm:h-64 sm:w-64" />
        <div className="flex gap-2">
          <div className="skeleton h-8 w-20 rounded-full" />
          <div className="skeleton h-8 w-20 rounded-full" />
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-12 w-2/3" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="skeleton h-20" />
          <div className="skeleton h-20" />
          <div className="skeleton h-20" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="skeleton h-4" />
          ))}
        </div>
      </div>
    </div>
  )
}
