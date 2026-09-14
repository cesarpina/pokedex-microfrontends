import { motion } from 'motion/react'
import { capitalize, typeColor } from '@pokedex/shared'
import { useHomeFilterStore } from './home-filter-store'

interface TypeFilterProps {
  types: string[] | undefined
}

export function TypeFilter({ types }: TypeFilterProps) {
  const selected = useHomeFilterStore((state) => state.types)
  const toggleType = useHomeFilterStore((state) => state.toggleType)
  const setTypes = useHomeFilterStore((state) => state.setTypes)

  if (!types) {
    return (
      <div role="status" aria-label="Cargando tipos" className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index} className="skeleton h-9 w-20 rounded-full" />
        ))}
      </div>
    )
  }

  const allSelected = selected.length === types.length

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por tipo">
      <Chip
        active={allSelected}
        color="var(--ink)"
        onClick={() => setTypes(allSelected ? [] : types)}
      >
        {allSelected ? 'Ninguno' : 'Todos'}
      </Chip>
      {types.map((type) => (
        <Chip
          key={type}
          active={selected.includes(type)}
          color={typeColor(type)}
          onClick={() => toggleType(type)}
        >
          {capitalize(type)}
        </Chip>
      ))}
    </div>
  )
}

interface ChipProps {
  active: boolean
  color: string
  onClick: () => void
  children: React.ReactNode
}

function Chip({ active, color, onClick, children }: ChipProps) {
  return (
    <motion.button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 transition-all duration-300 ${
        active
          ? 'text-white shadow-md ring-transparent'
          : 'bg-surface text-muted ring-line hover:text-ink hover:ring-accent/40'
      }`}
      style={
        active ? { backgroundColor: color, boxShadow: `0 8px 20px -10px ${color}` } : undefined
      }
    >
      <span
        aria-hidden
        className={`h-2 w-2 rounded-full ${active ? 'bg-white/80' : ''}`}
        style={active ? undefined : { backgroundColor: color }}
      />
      {children}
    </motion.button>
  )
}
