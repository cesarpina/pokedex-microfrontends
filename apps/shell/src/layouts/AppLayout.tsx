import { AnimatePresence, motion } from 'motion/react'
import { useLocation, useOutlet } from 'react-router'
import { AmbientBackground } from '@/components/AmbientBackground'
import { Header } from '@/components/Header'
import { SearchModal } from '@/features/search/SearchModal'
import { LastVisitedToast } from '@/features/toast/LastVisitedToast'

export function AppLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div className="flex min-h-dvh flex-col">
      <AmbientBackground />
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>

      <SearchModal />
      <LastVisitedToast />
    </div>
  )
}
