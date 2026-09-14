import { Navigate, useNavigate, useParams } from 'react-router'
import { useCompareStore } from '@pokedex/shared'
import { RemoteFallback } from '@/remotes/RemoteFallback'
import { RemoteModule } from '@/remotes/RemoteModule'

const loadPokemonCompare = () => import('pokemonDetail/PokemonCompare')

export function ComparePage() {
  const { first, second } = useParams<{ first: string; second: string }>()
  const clear = useCompareStore((state) => state.clear)
  const navigate = useNavigate()

  if (!first || !second || first === second) return <Navigate to="/" replace />

  return (
    <div className="mx-auto max-w-4xl">
      <RemoteModule
        name="Comparación de Pokémon"
        load={loadPokemonCompare}
        fallback={<RemoteFallback label="Cargando comparación" />}
        props={{
          names: [first, second] as [string, string],
          onBack: () => navigate(-1),
          onReset: () => {
            clear()
            navigate('/')
          },
        }}
      />
    </div>
  )
}
