import { motion } from 'motion/react'
import { formatStatName, type PokemonStat } from '@pokedex/shared'

const MAX_BASE_STAT = 255

interface StatBarProps {
  stat: PokemonStat
  color: string
  delay: number
}

export function StatBar({ stat, color, delay }: StatBarProps) {
  const percentage = Math.min(100, (stat.value / MAX_BASE_STAT) * 100)

  return (
    <li className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-3 text-sm">
      <span className="font-medium text-muted">{formatStatName(stat.name)}</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <motion.span
        className="text-right font-display font-bold tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        {stat.value}
      </motion.span>
    </li>
  )
}
