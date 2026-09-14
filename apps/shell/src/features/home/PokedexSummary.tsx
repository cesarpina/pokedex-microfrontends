import { Database, Eye, Layers } from 'lucide-react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { selectTotalVisits, useHistoryStore, type PokedexOverview } from '@pokedex/shared'

interface PokedexSummaryProps {
  overview: PokedexOverview | undefined
}

export function PokedexSummary({ overview }: PokedexSummaryProps) {
  const visits = useHistoryStore(selectTotalVisits)

  return (
    <dl className="hidden items-center gap-2 sm:flex" aria-label="Resumen de la Pokédex">
      <Metric
        icon={<Database className="h-4 w-4" />}
        label="Pokémon"
        value={overview?.pokemonCount}
        delay={0}
      />
      <Metric
        icon={<Layers className="h-4 w-4" />}
        label="Tipos"
        value={overview?.types.length}
        delay={0.08}
      />
      <Metric icon={<Eye className="h-4 w-4" />} label="Visitas" value={visits} delay={0.16} />
    </dl>
  )
}

interface MetricProps {
  icon: React.ReactNode
  label: string
  value: number | undefined
  delay: number
}

function Metric({ icon, label, value, delay }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, delay }}
      whileHover={{ y: -2 }}
      title={label}
      className="glass flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 shadow-card"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent">
        {icon}
      </span>
      <span className="leading-tight">
        <dd className="font-display text-base font-extrabold tabular-nums">
          {value === undefined ? (
            <span className="skeleton inline-block h-4 w-10 align-middle" />
          ) : (
            <CountUp value={value} />
          )}
        </dd>
        <dt className="text-[0.65rem] font-medium tracking-wide text-muted uppercase">{label}</dt>
      </span>
    </motion.div>
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
