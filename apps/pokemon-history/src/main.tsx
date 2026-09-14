import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useThemeStore } from '@pokedex/shared'
import { PokemonHistory } from './PokemonHistory'
import './standalone.css'

useThemeStore.getState()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="mx-auto max-w-2xl px-4 py-10">
      <PokemonHistory
        onBack={() => window.history.back()}
        onSelect={(name) => window.alert(`Abrir detalle de ${name}`)}
      />
    </main>
  </StrictMode>,
)
