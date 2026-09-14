export function RemoteFallback({ label }: { label: string }) {
  return (
    <div
      role="status"
      aria-label={label}
      className="space-y-4 rounded-3xl bg-surface p-8 shadow-card ring-1 ring-line"
    >
      <div className="skeleton h-8 w-1/3" />
      <div className="skeleton h-40" />
      <div className="skeleton h-4 w-2/3" />
      <div className="skeleton h-4 w-1/2" />
    </div>
  )
}
