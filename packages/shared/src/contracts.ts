export interface PokemonDetailProps {
  name: string
  onBack: () => void
}

export interface PokemonHistoryProps {
  onBack: () => void
  onSelect: (name: string) => void
}
