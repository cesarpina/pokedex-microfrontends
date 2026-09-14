import { request } from './client'
import { extractIdFromUrl, officialArtworkUrl, pickBestSprite } from './images'
import type {
  NamedResource,
  PokemonDetail,
  PokemonListResponse,
  PokemonResponse,
  PokemonSummary,
  PokemonTypeResponse,
} from './types'

export const SEARCH_PAGE_SIZE = 30
export const POKEMON_PER_TYPE = 10

export const FEATURED_TYPES = [
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'dragon',
  'ghost',
  'fairy',
] as const

export type FeaturedType = (typeof FEATURED_TYPES)[number]

function toSummary(resource: NamedResource): PokemonSummary {
  const id = extractIdFromUrl(resource.url)
  return { id, name: resource.name, image: officialArtworkUrl(id) }
}

function toDetail(pokemon: PokemonResponse): PokemonDetail {
  return {
    id: pokemon.id,
    name: pokemon.name,
    image: pickBestSprite(pokemon.sprites),
    height: pokemon.height,
    weight: pokemon.weight,
    types: pokemon.types.map((entry) => entry.type.name),
    stats: pokemon.stats.map((entry) => ({ name: entry.stat.name, value: entry.base_stat })),
    abilities: pokemon.abilities.map((entry) => entry.ability.name),
  }
}

export async function fetchPokemonByType(type: string, signal?: AbortSignal) {
  const data = await request<PokemonTypeResponse>(`/type/${type}`, signal)
  return data.pokemon.slice(0, POKEMON_PER_TYPE).map((entry) => toSummary(entry.pokemon))
}

export interface PokemonPage {
  items: PokemonSummary[]
  nextOffset: number | null
}

export async function fetchPokemonPage(offset: number, signal?: AbortSignal): Promise<PokemonPage> {
  const data = await request<PokemonListResponse>(
    `/pokemon?limit=${SEARCH_PAGE_SIZE}&offset=${offset}`,
    signal,
  )
  return {
    items: data.results.map(toSummary),
    nextOffset: data.next ? offset + SEARCH_PAGE_SIZE : null,
  }
}

export async function fetchPokemon(nameOrId: string | number, signal?: AbortSignal) {
  const data = await request<PokemonResponse>(`/pokemon/${nameOrId}`, signal)
  return toDetail(data)
}

export function normalizeSearchTerm(term: string) {
  return term
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '')
}
