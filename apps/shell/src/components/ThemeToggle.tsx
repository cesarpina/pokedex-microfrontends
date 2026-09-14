import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useThemeStore } from '@pokedex/shared'

interface ThemeToggleProps {
  label?: string
}

export function ThemeToggle({ label }: ThemeToggleProps) {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={label ?? 'Cambiar tema'}
      onClick={toggleTheme}
      className="group inline-flex items-center gap-2 rounded-full text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
    >
      <span className="relative flex h-7 w-12 items-center rounded-full bg-surface-2 p-1 ring-1 ring-line transition-colors group-hover:ring-accent/40">
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`flex h-5 w-5 items-center justify-center rounded-full bg-ink text-canvas shadow ${
            isDark ? 'ml-auto' : ''
          }`}
        >
          {isDark ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
        </motion.span>
      </span>
      {label && <span>{label}</span>}
    </button>
  )
}
