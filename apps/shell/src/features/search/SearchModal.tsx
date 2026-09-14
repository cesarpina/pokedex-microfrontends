import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { selectCompareReady, useCompareStore, type PokemonSummary } from '@pokedex/shared'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { SearchPanel } from './SearchPanel'
import { useSearchStore } from './search-store'

export function SearchModal() {
  const open = useSearchStore((state) => state.open)
  const mode = useSearchStore((state) => state.mode)
  const openSearch = useSearchStore((state) => state.openSearch)
  const closeSearch = useSearchStore((state) => state.closeSearch)
  const navigate = useNavigate()

  useLockBodyScroll(open)

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const typing = ['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)
      if (event.key === 'Escape') closeSearch()
      if (event.key === '/' && !typing) {
        event.preventDefault()
        openSearch()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [openSearch, closeSearch])

  const handleSelect = (pokemon: PokemonSummary) => {
    closeSearch()

    if (mode === 'navigate') {
      navigate(`/pokemon/${pokemon.name}`)
      return
    }

    useCompareStore.getState().select(pokemon)
    const compare = useCompareStore.getState()
    if (selectCompareReady(compare)) {
      const [first, second] = compare.selected
      navigate(`/compare/${first.name}/${second.name}`)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Buscar un Pokémon"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-canvas/85 backdrop-blur-xl"
        >
          <SearchPanel mode={mode} onClose={closeSearch} onSelect={handleSelect} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
