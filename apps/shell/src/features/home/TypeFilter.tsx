import { ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import { capitalize, typeColor } from '@pokedex/shared'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useHomeFilterStore } from './home-filter-store'

const COLLAPSED_HEIGHT = 40

interface TypeFilterProps {
  types: string[] | undefined
}

export function TypeFilter({ types }: TypeFilterProps) {
  const selected = useHomeFilterStore((state) => state.types)
  const toggleType = useHomeFilterStore((state) => state.toggleType)
  const setTypes = useHomeFilterStore((state) => state.setTypes)
  const wideScreen = useMediaQuery('(min-width: 640px)')
  const [expanded, setExpanded] = useState(false)
  const showAll = wideScreen || expanded

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
    <div className="space-y-2">
      <motion.div
        role="group"
        aria-label="Filtrar por tipo"
        initial={false}
        animate={{ height: showAll ? 'auto' : COLLAPSED_HEIGHT }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap items-center gap-2 overflow-hidden"
      >
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
      </motion.div>

      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 sm:hidden"
      >
        {expanded ? 'Ver menos' : `Ver todas (${selected.length} activas)`}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
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
