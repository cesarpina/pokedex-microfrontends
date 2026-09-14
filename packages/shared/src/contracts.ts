export interface PokemonDetailProps {
  name: string
  onBack: () => void
}

export interface PokemonCompareProps {
  names: [string, string]
  onBack: () => void
  onReset: () => void
}

export interface PokemonHistoryProps {
  onBack: () => void
  onSelect: (name: string) => void
}
