import { AlertTriangle, RefreshCw } from 'lucide-react'

interface InlineErrorProps {
  message: string
  onRetry?: () => void
}

export function InlineError({ message, onRetry }: InlineErrorProps) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent-2/30 bg-accent-2/5 px-4 py-3 text-sm"
    >
      <span className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-accent-2" />
        {message}
      </span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 font-medium ring-1 ring-line transition-colors hover:bg-surface-2"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reintentar
        </button>
      )}
    </div>
  )
}
