export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatPokemonName(name: string) {
  return name.split('-').map(capitalize).join(' ')
}

export function formatPokedexNumber(id: number) {
  return `#${String(id).padStart(3, '0')}`
}

export const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. especial',
  'special-defense': 'Def. especial',
  speed: 'Velocidad',
}

export function formatStatName(stat: string) {
  return STAT_LABELS[stat] ?? formatPokemonName(stat)
}

export function formatRelativeTime(timestamp: number, now = Date.now()) {
  const seconds = Math.round((now - timestamp) / 1000)
  const formatter = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })

  if (seconds < 60) return 'hace un momento'
  if (seconds < 3600) return formatter.format(-Math.round(seconds / 60), 'minute')
  if (seconds < 86400) return formatter.format(-Math.round(seconds / 3600), 'hour')
  return formatter.format(-Math.round(seconds / 86400), 'day')
}
