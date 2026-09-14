import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { useThemeStore } from '@pokedex/shared'
import { queryClient } from './query-client'
import { router } from './router'

useThemeStore.getState()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
