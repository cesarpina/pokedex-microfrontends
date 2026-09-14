import { Eye, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { formatPokemonName, selectPendingToast, useHistoryStore } from '@pokedex/shared'

export function LastVisitedToast() {
  const [pokemon] = useState(() => selectPendingToast(useHistoryStore.getState()))
  const [visible, setVisible] = useState(Boolean(pokemon))
  const dismissToast = useHistoryStore((state) => state.dismissToast)
  const navigate = useNavigate()

  const close = () => {
    dismissToast()
    setVisible(false)
  }

  const openDetail = () => {
    if (!pokemon) return
    close()
    navigate(`/pokemon/${pokemon.name}`)
  }

  return (
    <AnimatePresence>
      {visible && pokemon && (
        <motion.aside
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.4 }}
          className="glass fixed inset-x-4 top-20 z-40 flex items-center gap-4 rounded-2xl p-3 shadow-card sm:inset-x-auto sm:top-auto sm:right-6 sm:bottom-6 sm:w-96"
        >
          <button
            type="button"
            onClick={openDetail}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-ink transition-transform duration-500 ease-spring hover:scale-105"
            aria-label={`Ver detalle de ${formatPokemonName(pokemon.name)}`}
          >
            <img src={pokemon.image} alt="" className="h-12 w-12 object-contain drop-shadow-md" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">
              Último Pokémon visitado
            </p>
            <p className="truncate font-display text-lg font-bold">
              {formatPokemonName(pokemon.name)}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted">
              <Eye className="h-3 w-3" />
              {pokemon.visits} {pokemon.visits === 1 ? 'visita' : 'visitas'}
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-surface-2"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
