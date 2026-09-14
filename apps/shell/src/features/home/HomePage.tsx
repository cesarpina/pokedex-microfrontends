import { Filter, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { usePokedexOverview } from '@pokedex/shared'
import { InlineError } from '@/components/InlineError'
import { useSearchStore } from '@/features/search/search-store'
import { CategorySection } from './CategorySection'
import { useHomeFilterStore } from './home-filter-store'
import { PokedexSummary } from './PokedexSummary'
import { TypeFilter } from './TypeFilter'

export function HomePage() {
  const openSearch = useSearchStore((state) => state.openSearch)
  const overview = usePokedexOverview()
  const selectedTypes = useHomeFilterStore((state) => state.types)
  const knownTypes = overview.data?.types
  const visibleTypes = knownTypes
    ? selectedTypes.filter((type) => knownTypes.includes(type))
    : selectedTypes

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Explora la <span className="text-gradient">Pokédex</span>
            </h1>
            <p className="mt-1 text-muted">
              Descubre Pokémon por categoría, búscalos por su nombre o compáralos entre sí.
            </p>
          </div>
          <PokedexSummary overview={overview.data} />
        </div>

        <button
          type="button"
          onClick={() => openSearch()}
          className="group flex w-full items-center gap-3 rounded-2xl bg-surface px-5 py-4 text-left text-muted shadow-card ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:ring-accent/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="flex-1">Buscar un Pokémon</span>
          <kbd className="hidden rounded-lg bg-surface-2 px-2 py-1 font-mono text-xs sm:block">
            /
          </kbd>
        </button>

        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-muted">
            <Filter className="h-4 w-4" />
            Categorías
          </h2>
          {overview.isError ? (
            <InlineError message="No pudimos cargar los tipos." onRetry={overview.refetch} />
          ) : (
            <TypeFilter types={overview.data?.types} />
          )}
        </div>
      </motion.section>

      <AnimatePresence mode="popLayout" initial={false}>
        {visibleTypes.map((type, index) => (
          <motion.div
            key={type}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <CategorySection type={type} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>

      {visibleTypes.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-surface p-10 text-center text-muted ring-1 ring-line"
        >
          Elige al menos un tipo para ver sus Pokémon.
        </motion.p>
      )}
    </div>
  )
}
