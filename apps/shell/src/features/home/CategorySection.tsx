import { useState } from 'react'
import { useNavigate } from 'react-router'
import { capitalize, POKEMON_PER_TYPE, typeColor, usePokemonByType } from '@pokedex/shared'
import { InlineError } from '@/components/InlineError'
import { PokemonCard, PokemonCardSkeleton } from '@/components/PokemonCard'
import { useIntersection } from '@/hooks/useIntersection'

interface CategorySectionProps {
  type: string
  index: number
}

export function CategorySection({ type, index }: CategorySectionProps) {
  const [visible, setVisible] = useState(index < 2)
  const sectionRef = useIntersection<HTMLElement>(() => setVisible(true), {
    rootMargin: '200px',
    enabled: !visible,
  })
  const color = typeColor(type)
  const navigate = useNavigate()

  return (
    <section ref={sectionRef} aria-labelledby={`type-${type}`} className="space-y-4">
      <header className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full shadow-md"
          style={{ backgroundColor: color, boxShadow: `0 0 16px ${color}` }}
        />
        <h2 id={`type-${type}`} className="font-display text-2xl font-bold tracking-tight">
          {capitalize(type)}
        </h2>
        <span className="text-sm text-muted">Top {POKEMON_PER_TYPE}</span>
      </header>

      {visible ? (
        <CategoryGrid type={type} color={color} onSelect={(name) => navigate(`/pokemon/${name}`)} />
      ) : (
        <SkeletonGrid />
      )}
    </section>
  )
}

interface CategoryGridProps {
  type: string
  color: string
  onSelect: (name: string) => void
}

function CategoryGrid({ type, color, onSelect }: CategoryGridProps) {
  const { data, isPending, isError, refetch } = usePokemonByType(type)

  if (isPending) return <SkeletonGrid />

  if (isError) {
    return (
      <InlineError message={`No pudimos cargar los Pokémon de tipo ${type}.`} onRetry={refetch} />
    )
  }

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {data.map((pokemon, position) => (
        <li key={pokemon.id}>
          <PokemonCard
            pokemon={pokemon}
            accent={color}
            delay={position * 0.04}
            onClick={() => onSelect(pokemon.name)}
          />
        </li>
      ))}
    </ul>
  )
}

function SkeletonGrid() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: POKEMON_PER_TYPE }).map((_, position) => (
        <li key={position}>
          <PokemonCardSkeleton />
        </li>
      ))}
    </ul>
  )
}
