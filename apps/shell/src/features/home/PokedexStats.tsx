import { Database, Eye, Layers } from 'lucide-react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { selectTotalVisits, useHistoryStore, type PokedexOverview } from '@pokedex/shared'

interface PokedexStatsProps {
  overview: PokedexOverview | undefined
}

export function PokedexStats({ overview }: PokedexStatsProps) {
  const visits = useHistoryStore(selectTotalVisits)

  return (
    <dl className="grid grid-cols-3 gap-3">
      <Stat
        icon={<Database className="h-4 w-4" />}
        label="Pokémon en la API"
        value={overview?.pokemonCount}
      />
      <Stat icon={<Layers className="h-4 w-4" />} label="Tipos" value={overview?.types.length} />
      <Stat icon={<Eye className="h-4 w-4" />} label="Tus visitas" value={visits} />
    </dl>
  )
}

interface StatProps {
  icon: React.ReactNode
  label: string
  value: number | undefined
}

function Stat({ icon, label, value }: StatProps) {
  return (
    <div className="rounded-2xl bg-surface p-3 shadow-card ring-1 ring-line sm:p-4">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-muted">
        <span className="text-accent">{icon}</span>
        <span className="truncate">{label}</span>
      </dt>
      <dd className="mt-1 font-display text-2xl font-extrabold tabular-nums sm:text-3xl">
        {value === undefined ? (
          <span className="skeleton inline-block h-7 w-16" />
        ) : (
          <CountUp value={value} />
        )}
      </dd>
    </div>
  )
}

function CountUp({ value }: { value: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('es'))

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.2, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [count, value])

  return <motion.span>{rounded}</motion.span>
}
