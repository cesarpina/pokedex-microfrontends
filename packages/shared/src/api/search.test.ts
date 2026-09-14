import { describe, expect, it } from 'vitest'
import { normalizeSearchTerm, searchPokemonIndex } from './pokeapi'

const index = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'tangela', 'bellsprout'].map(
  (name, id) => ({ id: id + 1, name, image: '' }),
)

describe('normalizeSearchTerm', () => {
  it('lowercases and strips spaces and accents', () => {
    expect(normalizeSearchTerm('  Pikachú Prime ')).toBe('pikachuprime')
  })
})

describe('searchPokemonIndex', () => {
  it('returns nothing for an empty term', () => {
    expect(searchPokemonIndex(index, '')).toEqual([])
  })

  it('ranks prefix matches before partial matches', () => {
    const names = searchPokemonIndex(index, 'bel').map((pokemon) => pokemon.name)
    expect(names).toEqual(['bellsprout'])

    const saur = searchPokemonIndex(index, 'saur').map((pokemon) => pokemon.name)
    expect(saur).toEqual(['bulbasaur', 'ivysaur', 'venusaur'])
  })

  it('puts names that start with the term first', () => {
    const names = searchPokemonIndex(index, 'ta').map((pokemon) => pokemon.name)
    expect(names[0]).toBe('tangela')
  })
})
