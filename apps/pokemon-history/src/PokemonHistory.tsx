import { ArrowLeft, Trash2 } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { selectTotalVisits, useHistoryStore, type PokemonHistoryProps } from '@pokedex/shared'
import { EmptyHistory } from './components/EmptyHistory'
import { HistoryItem } from './components/HistoryItem'
import './styles.css'

export function PokemonHistory({ onBack, onSelect }: PokemonHistoryProps) {
  const entries = useHistoryStore((state) => state.entries)
  const totalVisits = useHistoryStore(selectTotalVisits)
  const clear = useHistoryStore((state) => state.clear)

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line"
      aria-labelledby="history-title"
    >
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-line px-6 py-5">
        <div>
          <h1 id="history-title" className="font-display text-2xl font-extrabold tracking-tight">
            Vistos recientemente
          </h1>
          <p className="text-sm text-muted">
            {entries.length === 0
              ? 'Todavía no has visitado ningún Pokémon.'
              : `${entries.length} Pokémon · ${totalVisits} visitas en total`}
          </p>
        </div>
      </header>

      <ul className="divide-y divide-line">
        <AnimatePresence initial={false}>
          {entries.map((entry, index) => (
            <HistoryItem
              key={entry.name}
              entry={entry}
              index={index}
              onSelect={() => onSelect(entry.name)}
            />
          ))}
        </AnimatePresence>
      </ul>

      {entries.length === 0 && <EmptyHistory />}

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-colors hover:bg-surface-2"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Regresar
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={entries.length === 0}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-canvas transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          <Trash2 className="h-4 w-4" />
          Limpiar historial
        </button>
      </footer>
    </motion.section>
  )
}

export default PokemonHistory
