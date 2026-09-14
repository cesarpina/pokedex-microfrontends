import { ChevronRight, Eye } from 'lucide-react'
import { motion } from 'motion/react'
import {
  formatPokedexNumber,
  formatPokemonName,
  formatRelativeTime,
  type HistoryEntry,
} from '@pokedex/shared'

interface HistoryItemProps {
  entry: HistoryEntry
  index: number
  onSelect: () => void
}

export function HistoryItem({ entry, index, onSelect }: HistoryItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0, transition: { delay: index * 0.05, duration: 0.4 } }}
      exit={{ opacity: 0, x: 24, transition: { duration: 0.25 } }}
    >
      <button
        type="button"
        onClick={onSelect}
        className="group flex w-full items-center gap-4 px-6 py-4 text-left transition-colors duration-300 hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none"
      >
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-surface-2 transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-3">
          <img
            src={entry.image}
            alt=""
            loading="lazy"
            className="h-12 w-12 object-contain drop-shadow-md"
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-lg font-bold">
            {formatPokemonName(entry.name)}
          </span>
          <span className="block text-sm text-muted">
            {formatPokedexNumber(entry.id)} · {formatRelativeTime(entry.lastVisitedAt)}
          </span>
        </span>

        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent"
          title={`${entry.visits} visitas`}
        >
          <Eye className="h-3.5 w-3.5" />
          {entry.visits}
        </span>

        <ChevronRight className="h-5 w-5 text-muted transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </motion.li>
  )
}
