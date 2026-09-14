import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PokemonSummary } from '../api/types'

export const COMPARE_SLOTS = 2

interface CompareState {
  selected: PokemonSummary[]
  toggle: (pokemon: PokemonSummary) => void
  remove: (name: string) => void
  clear: () => void
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set) => ({
      selected: [],

      toggle: (pokemon) =>
        set((state) => {
          if (state.selected.some((entry) => entry.name === pokemon.name)) {
            return { selected: state.selected.filter((entry) => entry.name !== pokemon.name) }
          }
          return { selected: [...state.selected, pokemon].slice(-COMPARE_SLOTS) }
        }),

      remove: (name) =>
        set((state) => ({ selected: state.selected.filter((entry) => entry.name !== name) })),

      clear: () => set({ selected: [] }),
    }),
    { name: 'pokedex.compare' },
  ),
)

export const selectIsCompared = (name: string) => (state: CompareState) =>
  state.selected.some((entry) => entry.name === name)

export const selectCompareReady = (state: CompareState) => state.selected.length === COMPARE_SLOTS
