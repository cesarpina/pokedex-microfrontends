declare module 'pokemonDetail/PokemonDetail' {
  import type { PokemonDetailProps } from '@pokedex/shared'
  const PokemonDetail: React.ComponentType<PokemonDetailProps>
  export default PokemonDetail
}

declare module 'pokemonHistory/PokemonHistory' {
  import type { PokemonHistoryProps } from '@pokedex/shared'
  const PokemonHistory: React.ComponentType<PokemonHistoryProps>
  export default PokemonHistory
}

declare module 'pokemonDetail/PokemonCompare' {
  import type { PokemonCompareProps } from '@pokedex/shared'
  const PokemonCompare: React.ComponentType<PokemonCompareProps>
  export default PokemonCompare
}
