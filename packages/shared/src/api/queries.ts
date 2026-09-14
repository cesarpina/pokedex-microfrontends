import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ApiError } from './client'
import { fetchPokemon, fetchPokemonByType, fetchPokemonPage } from './pokeapi'

export const pokemonKeys = {
  all: ['pokemon'] as const,
  byType: (type: string) => [...pokemonKeys.all, 'type', type] as const,
  list: () => [...pokemonKeys.all, 'list'] as const,
  detail: (nameOrId: string | number) => [...pokemonKeys.all, 'detail', String(nameOrId)] as const,
}

const ONE_HOUR = 60 * 60 * 1000

export function usePokemonByType(type: string) {
  return useQuery({
    queryKey: pokemonKeys.byType(type),
    queryFn: ({ signal }) => fetchPokemonByType(type, signal),
    staleTime: ONE_HOUR,
  })
}

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: pokemonKeys.list(),
    queryFn: ({ pageParam, signal }) => fetchPokemonPage(pageParam, signal),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    staleTime: ONE_HOUR,
  })
}

export function usePokemon(nameOrId: string | number | null) {
  return useQuery({
    queryKey: pokemonKeys.detail(nameOrId ?? ''),
    queryFn: ({ signal }) => fetchPokemon(nameOrId as string, signal),
    enabled: nameOrId !== null && nameOrId !== '',
    staleTime: ONE_HOUR,
    retry: (failureCount, error) =>
      !(error instanceof ApiError && error.isNotFound) && failureCount < 2,
  })
}
