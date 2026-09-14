import { ApiError, usePokemon, type PokemonCompareProps } from '@pokedex/shared'
import { CompareSkeleton } from './components/CompareSkeleton'
import { CompareView } from './components/CompareView'
import { StatusPanel } from './components/StatusPanel'
import './styles.css'

export function PokemonCompare({ names, onBack, onReset }: PokemonCompareProps) {
  const [firstName, secondName] = names
  const first = usePokemon(firstName)
  const second = usePokemon(secondName)

  if (first.isPending || second.isPending) return <CompareSkeleton />

  const failed = [first, second].find((query) => query.isError)
  if (failed?.isError) {
    const notFound = failed.error instanceof ApiError && failed.error.isNotFound
    const missing = failed === first ? firstName : secondName
    return (
      <StatusPanel
        title={notFound ? 'Pokémon no encontrado' : 'No pudimos cargar la comparación'}
        description={
          notFound
            ? `No existe ningún Pokémon llamado "${missing}".`
            : 'Revisa tu conexión e inténtalo de nuevo.'
        }
        onBack={onBack}
        onRetry={notFound ? undefined : () => failed.refetch()}
      />
    )
  }

  if (!first.isSuccess || !second.isSuccess) return <CompareSkeleton />

  return <CompareView left={first.data} right={second.data} onBack={onBack} onReset={onReset} />
}

export default PokemonCompare
