export interface NamedResource {
  name: string
  url: string
}

export interface PokemonTypeResponse {
  name: string
  pokemon: Array<{ slot: number; pokemon: NamedResource }>
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: NamedResource[]
}

export interface PokemonResponse {
  id: number
  name: string
  height: number
  weight: number
  types: Array<{ slot: number; type: NamedResource }>
  stats: Array<{ base_stat: number; stat: NamedResource }>
  abilities: Array<{ ability: NamedResource; is_hidden: boolean }>
  sprites: {
    front_default: string | null
    other?: {
      dream_world?: { front_default: string | null }
      'official-artwork'?: { front_default: string | null }
    }
  }
}

export interface PokemonSummary {
  id: number
  name: string
  image: string
}

export interface PokemonStat {
  name: string
  value: number
}

export interface PokemonDetail extends PokemonSummary {
  height: number
  weight: number
  types: string[]
  stats: PokemonStat[]
  abilities: string[]
}
