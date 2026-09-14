import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useThemeStore } from '@pokedex/shared'
import { PokemonDetail } from './PokemonDetail'
import './standalone.css'

useThemeStore.getState()

const queryClient = new QueryClient()
const params = new URLSearchParams(window.location.search)
const name = params.get('name') ?? 'charizard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <PokemonDetail name={name} onBack={() => window.history.back()} />
      </main>
    </QueryClientProvider>
  </StrictMode>,
)
