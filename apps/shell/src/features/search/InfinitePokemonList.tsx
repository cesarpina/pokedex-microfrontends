import { Loader2 } from 'lucide-react'
import type { RefObject } from 'react'
import { SEARCH_PAGE_SIZE, usePokemonList, type PokemonSummary } from '@pokedex/shared'
import { InlineError } from '@/components/InlineError'
import { PokemonCard, PokemonCardSkeleton } from '@/components/PokemonCard'
import { useIntersection } from '@/hooks/useIntersection'

interface InfinitePokemonListProps {
  root: RefObject<HTMLElement | null>
  onSelect: (pokemon: PokemonSummary) => void
}

export function InfinitePokemonList({ root, onSelect }: InfinitePokemonListProps) {
  const { data, isPending, isError, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePokemonList()

  const sentinelRef = useIntersection<HTMLDivElement>(
    () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage()
    },
    { root: root.current, rootMargin: '400px', enabled: Boolean(hasNextPage) },
  )

  if (isPending) {
    return (
      <Grid>
        {Array.from({ length: SEARCH_PAGE_SIZE }).map((_, index) => (
          <li key={index}>
            <PokemonCardSkeleton />
          </li>
        ))}
      </Grid>
    )
  }

  if (isError) {
    return <InlineError message="No pudimos cargar la lista de Pokémon." onRetry={refetch} />
  }

  const items = data.pages.flatMap((page) => page.items)

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        Mostrando <span className="font-semibold text-ink">{items.length}</span> Pokémon. Sigue
        bajando para cargar más.
      </p>

      <Grid>
        {items.map((pokemon, index) => (
          <li key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              delay={(index % SEARCH_PAGE_SIZE) * 0.02}
              onClick={() => onSelect(pokemon)}
            />
          </li>
        ))}
      </Grid>

      <div ref={sentinelRef} className="flex h-16 items-center justify-center text-sm text-muted">
        {isFetchingNextPage && <Loader2 className="h-5 w-5 animate-spin text-accent" />}
        {!hasNextPage && 'Has llegado al final de la Pokédex.'}
      </div>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {children}
    </ul>
  )
}
