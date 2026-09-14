import { Search } from 'lucide-react'
import { motion } from 'motion/react'
import { FEATURED_TYPES } from '@pokedex/shared'
import { useSearchStore } from '@/features/search/search-store'
import { CategorySection } from './CategorySection'

export function HomePage() {
  const openSearch = useSearchStore((state) => state.openSearch)

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-5"
      >
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Explora la <span className="text-gradient">Pokédex</span>
          </h1>
          <p className="mt-1 text-muted">
            Descubre Pokémon por categoría o búscalos por su nombre.
          </p>
        </div>

        <button
          type="button"
          onClick={openSearch}
          className="group flex w-full items-center gap-3 rounded-2xl bg-surface px-5 py-4 text-left text-muted shadow-card ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:ring-accent/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="flex-1">Buscar un Pokémon</span>
          <kbd className="hidden rounded-lg bg-surface-2 px-2 py-1 font-mono text-xs sm:block">
            /
          </kbd>
        </button>
      </motion.section>

      {FEATURED_TYPES.map((type, index) => (
        <CategorySection key={type} type={type} index={index} />
      ))}
    </div>
  )
}
