import { SearchX } from 'lucide-react'
import { motion } from 'motion/react'
import { ApiError, typeColor, usePokemon } from '@pokedex/shared'
import { InlineError } from '@/components/InlineError'
import { PokemonCard, PokemonCardSkeleton } from '@/components/PokemonCard'

interface ExactSearchResultProps {
  term: string
  onSelect: (name: string) => void
}

export function ExactSearchResult({ term, onSelect }: ExactSearchResultProps) {
  const { data, isPending, isError, error, refetch } = usePokemon(term)

  if (isPending) {
    return (
      <div className="mx-auto max-w-xs">
        <PokemonCardSkeleton />
      </div>
    )
  }

  if (isError) {
    if (error instanceof ApiError && error.isNotFound) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto flex max-w-sm flex-col items-center gap-3 py-16 text-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-accent-2">
            <SearchX className="h-8 w-8" />
          </span>
          <p className="font-display text-xl font-bold">No encontrado</p>
          <p className="text-sm text-muted">
            No existe ningún Pokémon llamado <span className="font-semibold text-ink">{term}</span>.
            La búsqueda es por nombre exacto, en minúsculas y sin espacios.
          </p>
        </motion.div>
      )
    }
    return <InlineError message="Ocurrió un error al buscar." onRetry={refetch} />
  }

  return (
    <div className="mx-auto max-w-xs">
      <PokemonCard
        pokemon={data}
        accent={typeColor(data.types[0])}
        onClick={() => onSelect(data.name)}
      />
    </div>
  )
}
