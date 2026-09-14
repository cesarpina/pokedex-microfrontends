import { TYPE_COLORS } from '../ui/type-colors'
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

export interface PokedexOverview {
  pokemonCount: number
  types: string[]
}

export async function fetchPokedexOverview(signal?: AbortSignal): Promise<PokedexOverview> {
  const [pokemon, types] = await Promise.all([
    request<PokemonListResponse>('/pokemon?limit=1&offset=0', signal),
    request<PokemonListResponse>('/type?limit=50', signal),
  ])
  return {
    pokemonCount: pokemon.count,
    types: types.results.map((type) => type.name).filter((type) => type in TYPE_COLORS),
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

const INDEX_PAGE_SIZE = 2000
const MAX_SUGGESTIONS = 12

export async function fetchPokemonIndex(signal?: AbortSignal): Promise<PokemonSummary[]> {
  const data = await request<PokemonListResponse>(
    `/pokemon?limit=${INDEX_PAGE_SIZE}&offset=0`,
    signal,
  )
  return data.results.map(toSummary)
}

export function searchPokemonIndex(index: PokemonSummary[], term: string): PokemonSummary[] {
  if (!term) return []
  const startsWith = index.filter((pokemon) => pokemon.name.startsWith(term))
  const contains = index.filter(
    (pokemon) => !pokemon.name.startsWith(term) && pokemon.name.includes(term),
  )
  return [...startsWith, ...contains].slice(0, MAX_SUGGESTIONS)
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
