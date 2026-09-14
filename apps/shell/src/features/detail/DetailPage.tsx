import { Navigate, useNavigate, useParams } from 'react-router'
import { RemoteFallback } from '@/remotes/RemoteFallback'
import { RemoteModule } from '@/remotes/RemoteModule'

const loadPokemonDetail = () => import('pokemonDetail/PokemonDetail')

export function DetailPage() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()

  if (!name) return <Navigate to="/" replace />

  return (
    <div className="mx-auto max-w-4xl">
      <RemoteModule
        name="Detalle de Pokémon"
        load={loadPokemonDetail}
        fallback={<RemoteFallback label="Cargando detalle" />}
        props={{ name, onBack: () => navigate(-1) }}
      />
    </div>
  )
}
