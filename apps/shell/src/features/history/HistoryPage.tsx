import { useNavigate } from 'react-router'
import { RemoteFallback } from '@/remotes/RemoteFallback'
import { RemoteModule } from '@/remotes/RemoteModule'

const loadPokemonHistory = () => import('pokemonHistory/PokemonHistory')

export function HistoryPage() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl">
      <RemoteModule
        name="Historial"
        load={loadPokemonHistory}
        fallback={<RemoteFallback label="Cargando historial" />}
        props={{
          onBack: () => navigate('/'),
          onSelect: (name: string) => navigate(`/pokemon/${name}`),
        }}
      />
    </div>
  )
}
