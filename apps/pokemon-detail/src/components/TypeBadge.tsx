import { capitalize, typeColor } from '@pokedex/shared'

export function TypeBadge({ type }: { type: string }) {
  const color = typeColor(type)

  return (
    <span
      className="rounded-full px-4 py-1.5 text-sm font-semibold text-white shadow-md transition-transform duration-300 hover:scale-105"
      style={{ backgroundColor: color, boxShadow: `0 10px 24px -10px ${color}` }}
    >
      {capitalize(type)}
    </span>
  )
}
