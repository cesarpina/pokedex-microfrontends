import { create } from 'zustand'

export type SearchMode = 'navigate' | 'compare'

interface SearchState {
  open: boolean
  mode: SearchMode
  openSearch: (mode?: SearchMode) => void
  closeSearch: () => void
}

export const useSearchStore = create<SearchState>()((set) => ({
  open: false,
  mode: 'navigate',
  openSearch: (mode = 'navigate') => set({ open: true, mode }),
  closeSearch: () => set({ open: false }),
}))
