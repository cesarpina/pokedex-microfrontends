import type { PokemonResponse } from './types'

const SPRITES_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export function extractIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : 0
}

export function officialArtworkUrl(id: number): string {
  return `${SPRITES_BASE_URL}/other/official-artwork/${id}.png`
}

export function pickBestSprite(sprites: PokemonResponse['sprites']): string {
  return (
    sprites.other?.dream_world?.front_default ??
    sprites.other?.['official-artwork']?.front_default ??
    sprites.front_default ??
    ''
  )
}
