import { Search, X } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { normalizeSearchTerm } from '@pokedex/shared'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { InfinitePokemonList } from './InfinitePokemonList'
import { SearchResults } from './SearchResults'

interface SearchPanelProps {
  onClose: () => void
  onSelect: (name: string) => void
}

export function SearchPanel({ onClose, onSelect }: SearchPanelProps) {
  const [term, setTerm] = useState('')
  const debouncedTerm = useDebouncedValue(term)
  const normalizedTerm = normalizeSearchTerm(debouncedTerm)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 pt-5 sm:px-6"
      >
        <label className="relative flex-1">
          <span className="sr-only">Nombre exacto del Pokémon</span>
          <Search className="pointer-events-none absolute inset-y-0 left-4 my-auto h-5 w-5 text-muted" />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Buscar un Pokémon (ej. pikachu)"
            autoComplete="off"
            autoFocus
            spellCheck={false}
            className="w-full rounded-2xl bg-surface py-3.5 pr-4 pl-12 text-base shadow-card ring-1 ring-line transition-shadow outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar buscador"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface shadow-card ring-1 ring-line transition-all duration-300 hover:rotate-90 hover:bg-surface-2"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          {normalizedTerm ? (
            <SearchResults term={normalizedTerm} onSelect={onSelect} />
          ) : (
            <InfinitePokemonList root={scrollRef} onSelect={onSelect} />
          )}
        </div>
      </div>
    </>
  )
}
