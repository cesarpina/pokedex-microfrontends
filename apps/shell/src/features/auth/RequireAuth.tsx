import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useSessionStore } from './session-store'

export function RequireAuth({ children }: { children: ReactNode }) {
  const user = useSessionStore((state) => state.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
