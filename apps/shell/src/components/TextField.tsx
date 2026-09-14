import { AnimatePresence, motion } from 'motion/react'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  icon?: ReactNode
  error?: string
}

export function TextField({ id, label, icon, error, className = '', ...props }: TextFieldProps) {
  const describedBy = error ? `${id}-error` : undefined

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
            {icon}
          </span>
        )}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full rounded-2xl border bg-surface px-4 py-3 text-ink shadow-sm transition-all duration-300 outline-none placeholder:text-muted/70 focus:ring-4 ${
            icon ? 'pl-11' : ''
          } ${
            error
              ? 'border-accent-2 focus:ring-accent-2/20'
              : 'border-line focus:border-accent focus:ring-accent/20'
          } ${className}`}
          {...props}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={describedBy}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs font-medium text-accent-2"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
