export function CompareSkeleton() {
  return (
    <div
      role="status"
      aria-label="Cargando comparación"
      className="space-y-8 rounded-3xl bg-surface p-6 shadow-card ring-1 ring-line sm:p-10"
    >
      <div className="mx-auto skeleton h-9 w-48" />
      <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col items-center gap-3">
          <div className="skeleton h-40 w-40 rounded-full" />
          <div className="skeleton h-7 w-32" />
        </div>
        <div className="mx-auto skeleton h-14 w-14 rounded-full" />
        <div className="flex flex-col items-center gap-3">
          <div className="skeleton h-40 w-40 rounded-full" />
          <div className="skeleton h-7 w-32" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="skeleton h-4" />
        ))}
      </div>
    </div>
  )
}
