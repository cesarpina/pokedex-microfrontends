import { createBrowserRouter, Navigate } from 'react-router'
import { LoginPage } from '@/features/auth/LoginPage'
import { RequireAuth } from '@/features/auth/RequireAuth'
import { DetailPage } from '@/features/detail/DetailPage'
import { HistoryPage } from '@/features/history/HistoryPage'
import { HomePage } from '@/features/home/HomePage'
import { AppLayout } from '@/layouts/AppLayout'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pokemon/:name', element: <DetailPage /> },
      { path: 'history', element: <HistoryPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
