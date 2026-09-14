import { History } from 'lucide-react'
import { motion } from 'motion/react'

export function EmptyHistory() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-3 px-6 py-16 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-accent">
        <History className="h-8 w-8" />
      </span>
      <p className="font-display text-lg font-bold">Tu historial está vacío</p>
      <p className="max-w-xs text-sm text-muted">
        Cada Pokémon cuyo detalle abras aparecerá aquí con su número de visitas.
      </p>
    </motion.div>
  )
}
