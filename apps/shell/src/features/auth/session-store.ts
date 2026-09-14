import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SessionUser {
  username: string
  loggedInAt: number
}

interface SessionState {
  user: SessionUser | null
  login: (username: string) => void
  logout: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      login: (username) => set({ user: { username, loggedInAt: Date.now() } }),
      logout: () => set({ user: null }),
    }),
    { name: 'pokedex.session' },
  ),
)
