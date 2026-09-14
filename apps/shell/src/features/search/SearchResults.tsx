import { SearchX, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import {
  ApiError,
  searchPokemonIndex,
  typeColor,
  usePokemon,
  usePokemonIndex,
} from '@pokedex/shared'
import { InlineError } from '@/components/InlineError'
import { PokemonCard, PokemonCardSkeleton } from '@/components/PokemonCard'

interface SearchResultsProps {
  term: string
  onSelect: (name: string) => void
}

export function SearchResults({ term, onSelect }: SearchResultsProps) {
  const exact = usePokemon(term)
  const index = usePokemonIndex()
  const suggestions = index.data ? searchPokemonIndex(index.data, term) : []
  const notFound = exact.isError && exact.error instanceof ApiError && exact.error.isNotFound

  if (exact.isError && !notFound) {
    return <InlineError message="Ocurrió un error al buscar." onRetry={exact.refetch} />
  }

  return (
    <div className="space-y-10">
      <section aria-live="polite" className="space-y-4">
        <ResultHeading
          title="Coincidencia exacta"
          hint={exact.isPending ? 'Consultando la Pokédex…' : `GET /pokemon/${term}`}
        />

        {exact.isPending && (
          <div className="mx-auto max-w-xs">
            <PokemonCardSkeleton />
          </div>
        )}

        {exact.isSuccess && (
          <div className="mx-auto max-w-xs">
            <PokemonCard
              pokemon={exact.data}
              accent={typeColor(exact.data.types[0])}
              onClick={() => onSelect(exact.data.name)}
            />
          </div>
        )}

        {notFound && <NotFound term={term} hasSuggestions={suggestions.length > 0} />}
      </section>

      {suggestions.length > 0 && (
        <section className="space-y-4">
          <ResultHeading
            title="Nombres que coinciden"
            hint={`${suggestions.length} sugerencias`}
            icon={<Sparkles className="h-4 w-4 text-accent" />}
          />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {suggestions.map((pokemon, position) => (
              <li key={pokemon.id}>
                <PokemonCard
                  pokemon={pokemon}
                  delay={position * 0.03}
                  onClick={() => onSelect(pokemon.name)}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

interface ResultHeadingProps {
  title: string
  hint: string
  icon?: React.ReactNode
}

function ResultHeading({ title, hint, icon }: ResultHeadingProps) {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold">
        {icon}
        {title}
      </h2>
      <span className="font-mono text-xs text-muted">{hint}</span>
    </header>
  )
}

interface NotFoundProps {
  term: string
  hasSuggestions: boolean
}

function NotFound({ term, hasSuggestions }: NotFoundProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl bg-surface px-6 py-8 text-center ring-1 ring-line"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 text-accent-2">
        <SearchX className="h-7 w-7" />
      </span>
      <p className="font-display text-xl font-bold">No encontrado</p>
      <p className="text-sm text-muted">
        Ningún Pokémon se llama exactamente <span className="font-semibold text-ink">{term}</span>.
        {hasSuggestions
          ? ' Prueba con alguno de los nombres sugeridos abajo.'
          : ' La búsqueda es por nombre completo, en minúsculas y sin espacios.'}
      </p>
    </motion.div>
  )
}
