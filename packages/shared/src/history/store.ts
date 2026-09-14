import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { PokemonSummary } from '../api/types'

export interface HistoryEntry {
  id: number
  name: string
  image: string
  visits: number
  lastVisitedAt: number
}

export interface LastVisit {
  name: string
  sequence: number
}

export interface HistoryState {
  entries: HistoryEntry[]
  lastVisit: LastVisit | null
  dismissedSequence: number | null
  recordVisit: (pokemon: PokemonSummary) => void
  dismissToast: () => void
  clear: () => void
}

export const HISTORY_STORAGE_KEY = 'pokedex.history'

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      entries: [],
      lastVisit: null,
      dismissedSequence: null,

      recordVisit: (pokemon) =>
        set((state) => {
          const now = Date.now()
          const previous = state.entries.find((entry) => entry.name === pokemon.name)
          const updated: HistoryEntry = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.image,
            visits: (previous?.visits ?? 0) + 1,
            lastVisitedAt: now,
          }
          const others = state.entries.filter((entry) => entry.name !== pokemon.name)

          return {
            entries: [updated, ...others],
            lastVisit: { name: pokemon.name, sequence: (state.lastVisit?.sequence ?? 0) + 1 },
          }
        }),

      dismissToast: () =>
        set((state) => ({ dismissedSequence: state.lastVisit?.sequence ?? null })),

      clear: () => set({ entries: [], lastVisit: null, dismissedSequence: null }),
    }),
    {
      name: HISTORY_STORAGE_KEY,
      version: 1,
    },
  ),
)

export const selectPendingToast = (state: HistoryState): HistoryEntry | null => {
  const { lastVisit, dismissedSequence, entries } = state
  if (!lastVisit || dismissedSequence === lastVisit.sequence) return null
  return entries.find((entry) => entry.name === lastVisit.name) ?? null
}

export const selectTotalVisits = (state: HistoryState) =>
  state.entries.reduce((total, entry) => total + entry.visits, 0)
