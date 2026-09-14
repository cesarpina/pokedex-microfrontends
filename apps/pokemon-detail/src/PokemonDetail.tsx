import { useEffect, useRef } from 'react'
import { ApiError, useHistoryStore, usePokemon, type PokemonDetailProps } from '@pokedex/shared'
import { DetailSkeleton } from './components/DetailSkeleton'
import { DetailView } from './components/DetailView'
import { StatusPanel } from './components/StatusPanel'
import './styles.css'

export function PokemonDetail({ name, onBack }: PokemonDetailProps) {
  const { data: pokemon, isPending, isError, error, refetch } = usePokemon(name)
  const recordVisit = useHistoryStore((state) => state.recordVisit)
  const lastRecorded = useRef<string | null>(null)

  useEffect(() => {
    if (!pokemon || lastRecorded.current === pokemon.name) return
    lastRecorded.current = pokemon.name
    recordVisit({ id: pokemon.id, name: pokemon.name, image: pokemon.image })
  }, [pokemon, recordVisit])

  if (isPending) return <DetailSkeleton />

  if (isError) {
    const notFound = error instanceof ApiError && error.isNotFound
    return (
      <StatusPanel
        title={notFound ? 'Pokémon no encontrado' : 'No pudimos cargar este Pokémon'}
        description={
          notFound
            ? `No existe ningún Pokémon llamado "${name}".`
            : 'Revisa tu conexión e inténtalo de nuevo.'
        }
        onBack={onBack}
        onRetry={notFound ? undefined : () => refetch()}
      />
    )
  }

  return <DetailView pokemon={pokemon} onBack={onBack} />
}

export default PokemonDetail
