import { createBrowserRouter, Navigate } from 'react-router'
import { LoginPage } from '@/features/auth/LoginPage'
import { RequireAuth } from '@/features/auth/RequireAuth'
import { ComparePage } from '@/features/compare/ComparePage'
import { DetailPage } from '@/features/detail/DetailPage'
import { HistoryPage } from '@/features/history/HistoryPage'
import { HomePage } from '@/features/home/HomePage'
import { AppLayout } from '@/layouts/AppLayout'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

export const router = createBrowserRouter(
  [
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
        { path: 'compare/:first/:second', element: <ComparePage /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ],
  { basename },
)
