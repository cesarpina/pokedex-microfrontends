import { ArrowRight, Plus, Scale, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useNavigate } from 'react-router'
import {
  COMPARE_SLOTS,
  formatPokemonName,
  selectCompareReady,
  useCompareStore,
  type PokemonSummary,
} from '@pokedex/shared'
import { useSearchStore } from '@/features/search/search-store'

export function CompareTray() {
  const selected = useCompareStore((state) => state.selected)
  const ready = useCompareStore(selectCompareReady)
  const remove = useCompareStore((state) => state.remove)
  const clear = useCompareStore((state) => state.clear)
  const openSearch = useSearchStore((state) => state.openSearch)
  const navigate = useNavigate()
  const location = useLocation()

  const visible = selected.length > 0 && !location.pathname.startsWith('/compare')
  const slots = Array.from({ length: COMPARE_SLOTS }, (_, index) => selected[index] ?? null)

  const compare = () => {
    const [first, second] = selected
    navigate(`/compare/${first.name}/${second.name}`)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          aria-label="Comparación de Pokémon"
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 40, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="glass fixed bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] max-w-xl items-center gap-2 rounded-2xl p-2 shadow-card sm:gap-3"
        >
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-canvas sm:flex">
            <Scale className="h-5 w-5" />
          </span>

          <ul className="flex flex-1 items-center gap-2">
            {slots.map((pokemon, index) => (
              <li key={pokemon?.name ?? `empty-${index}`} className="min-w-0 flex-1">
                {pokemon ? (
                  <Slot pokemon={pokemon} onRemove={() => remove(pokemon.name)} />
                ) : (
                  <EmptySlot onClick={() => openSearch('compare')} />
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={compare}
            disabled={!ready}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-ink px-3 py-2.5 text-sm font-semibold text-canvas transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:px-4"
          >
            Comparar
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={clear}
            aria-label="Vaciar comparación"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

function Slot({ pokemon, onRemove }: { pokemon: PokemonSummary; onRemove: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 rounded-xl bg-surface px-2 py-1.5 ring-1 ring-line"
    >
      <img src={pokemon.image} alt="" className="h-8 w-8 shrink-0 object-contain" />
      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
        {formatPokemonName(pokemon.name)}
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Quitar ${formatPokemonName(pokemon.name)}`}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  )
}

function EmptySlot({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-line px-2 py-2.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Plus className="h-4 w-4" />
      <span className="truncate">Elegir otro</span>
    </button>
  )
}
