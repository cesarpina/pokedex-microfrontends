import { ArrowLeft, RefreshCw, SearchX } from 'lucide-react'
import { motion } from 'motion/react'

interface StatusPanelProps {
  title: string
  description: string
  onBack: () => void
  onRetry?: () => void
}

export function StatusPanel({ title, description, onBack, onRetry }: StatusPanelProps) {
  return (
    <motion.section
      role="alert"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4 rounded-3xl bg-surface p-10 text-center shadow-card ring-1 ring-line"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-2 text-accent">
        <SearchX className="h-8 w-8" />
      </span>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <p className="max-w-sm text-muted">{description}</p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-canvas transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          Regresar
        </button>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-2.5 font-semibold transition-transform hover:-translate-y-0.5"
          >
            <RefreshCw className="h-4 w-4" />
            Reintentar
          </button>
        )}
      </div>
    </motion.section>
  )
}
