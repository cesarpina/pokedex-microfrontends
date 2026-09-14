import { create } from 'zustand'
import { FEATURED_TYPES } from '@pokedex/shared'

interface HomeFilterState {
  types: string[]
  toggleType: (type: string) => void
  setTypes: (types: string[]) => void
}

export const useHomeFilterStore = create<HomeFilterState>()((set) => ({
  types: [...FEATURED_TYPES],

  toggleType: (type) =>
    set((state) => ({
      types: state.types.includes(type)
        ? state.types.filter((entry) => entry !== type)
        : [...state.types, type],
    })),

  setTypes: (types) => set({ types }),
}))
