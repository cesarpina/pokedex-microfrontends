export const TYPE_COLORS: Record<string, string> = {
  normal: '#a8a878',
  fire: '#f26d3d',
  water: '#4a90e2',
  grass: '#5cb85c',
  electric: '#f5c518',
  ice: '#7fd8e8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#d9a55c',
  flying: '#8fa8f5',
  psychic: '#f45c8a',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#5a4a3a',
  steel: '#9aa8b8',
  fairy: '#ee99ac',
}

export function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? '#8b8b9a'
}
