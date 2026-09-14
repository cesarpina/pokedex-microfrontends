import { ArrowLeft, RotateCcw, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import {
  formatPokedexNumber,
  formatPokemonName,
  formatStatName,
  typeColor,
  type PokemonDetail,
} from '@pokedex/shared'
import { PokemonImage } from './PokemonImage'
import { TypeBadge } from './TypeBadge'

interface CompareViewProps {
  left: PokemonDetail
  right: PokemonDetail
  onBack: () => void
  onReset: () => void
}

const MAX_BASE_STAT = 255

function totalStats(pokemon: PokemonDetail) {
  return pokemon.stats.reduce((sum, stat) => sum + stat.value, 0)
}

export function CompareView({ left, right, onBack, onReset }: CompareViewProps) {
  const leftColor = typeColor(left.types[0])
  const rightColor = typeColor(right.types[0])
  const leftTotal = totalStats(left)
  const rightTotal = totalStats(right)

  const rows = left.stats.map((stat, index) => ({
    name: stat.name,
    left: stat.value,
    right: right.stats[index]?.value ?? 0,
  }))
  const leftWins = rows.filter((row) => row.left > row.right).length
  const rightWins = rows.filter((row) => row.right > row.left).length

  return (
    <article className="relative animate-pop overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(70% 60% at 0% 20%, ${leftColor}, transparent 70%), radial-gradient(70% 60% at 100% 20%, ${rightColor}, transparent 70%)`,
        }}
      />

      <div className="relative space-y-8 p-6 sm:p-10">
        <header className="animate-pop text-center" style={{ animationDelay: '0.05s' }}>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Comparación
          </h1>
          <p className="mt-1 text-sm text-muted">
            <Summary
              left={left}
              right={right}
              leftWins={leftWins}
              rightWins={rightWins}
              leftTotal={leftTotal}
              rightTotal={rightTotal}
            />
          </p>
        </header>

        <div
          className="grid animate-pop items-center gap-6 sm:grid-cols-[1fr_auto_1fr]"
          style={{ animationDelay: '0.12s' }}
        >
          <Contender pokemon={left} color={leftColor} />
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink font-display text-lg font-extrabold text-canvas shadow-glow">
            VS
          </span>
          <Contender pokemon={right} color={rightColor} />
        </div>

        <section
          aria-label="Estadísticas base"
          className="animate-pop space-y-3"
          style={{ animationDelay: '0.2s' }}
        >
          {rows.map((row, index) => (
            <StatRow
              key={row.name}
              label={formatStatName(row.name)}
              left={row.left}
              right={row.right}
              leftColor={leftColor}
              rightColor={rightColor}
              delay={0.25 + index * 0.06}
            />
          ))}
          <StatRow
            label="Total"
            left={leftTotal}
            right={rightTotal}
            leftColor={leftColor}
            rightColor={rightColor}
            max={MAX_BASE_STAT * 6}
            delay={0.65}
            emphasis
          />
        </section>

        <dl
          className="grid animate-pop grid-cols-2 gap-3 sm:grid-cols-4"
          style={{ animationDelay: '0.3s' }}
        >
          <Fact label="Altura" value={`${left.height / 10} m`} />
          <Fact label="Peso" value={`${left.weight / 10} kg`} />
          <Fact label="Altura" value={`${right.height / 10} m`} />
          <Fact label="Peso" value={`${right.weight / 10} kg`} />
        </dl>

        <div
          className="flex animate-pop flex-wrap justify-center gap-3 pt-2"
          style={{ animationDelay: '0.4s' }}
        >
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Regresar
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-5 py-2.5 font-semibold transition-transform duration-300 hover:-translate-y-0.5"
          >
            <RotateCcw className="h-4 w-4" />
            Nueva comparación
          </button>
        </div>
      </div>
    </article>
  )
}

interface SummaryProps {
  left: PokemonDetail
  right: PokemonDetail
  leftWins: number
  rightWins: number
  leftTotal: number
  rightTotal: number
}

function Summary({ left, right, leftWins, rightWins, leftTotal, rightTotal }: SummaryProps) {
  if (leftTotal === rightTotal && leftWins === rightWins) {
    return <>Empate técnico: ambos suman {leftTotal} puntos de estadísticas base.</>
  }
  const leader = leftTotal >= rightTotal ? left : right
  const wins = leader === left ? leftWins : rightWins
  return (
    <>
      <strong className="text-ink">{formatPokemonName(leader.name)}</strong> lidera con{' '}
      {Math.max(leftTotal, rightTotal)} puntos en total y gana {wins} de 6 estadísticas.
    </>
  )
}

function Contender({ pokemon, color }: { pokemon: PokemonDetail; color: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-6 rounded-full opacity-50"
          style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
        />
        <PokemonImage
          src={pokemon.image}
          alt={formatPokemonName(pokemon.name)}
          className="relative h-40 w-40 animate-float object-contain drop-shadow-2xl sm:h-48 sm:w-48"
        />
      </div>
      <div>
        <span className="font-display text-xs font-semibold tracking-[0.3em] text-muted uppercase">
          {formatPokedexNumber(pokemon.id)}
        </span>
        <h2 className="font-display text-2xl font-extrabold tracking-tight">
          {formatPokemonName(pokemon.name)}
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>
    </div>
  )
}

interface StatRowProps {
  label: string
  left: number
  right: number
  leftColor: string
  rightColor: string
  delay: number
  max?: number
  emphasis?: boolean
}

function StatRow({
  label,
  left,
  right,
  leftColor,
  rightColor,
  delay,
  max = MAX_BASE_STAT,
  emphasis = false,
}: StatRowProps) {
  const leftWins = left > right
  const rightWins = right > left

  return (
    <div
      className={`grid grid-cols-[2.75rem_1fr_auto_1fr_2.75rem] items-center gap-2 text-sm sm:gap-3 ${
        emphasis ? 'border-t border-line pt-3 font-display text-base font-bold' : ''
      }`}
    >
      <Value value={left} winner={leftWins} align="left" />
      <Bar value={left} max={max} color={leftColor} delay={delay} direction="left" />
      <span className="min-w-20 text-center text-xs font-medium text-muted sm:min-w-28 sm:text-sm">
        {label}
      </span>
      <Bar value={right} max={max} color={rightColor} delay={delay} direction="right" />
      <Value value={right} winner={rightWins} align="right" />
    </div>
  )
}

function Value({
  value,
  winner,
  align,
}: {
  value: number
  winner: boolean
  align: 'left' | 'right'
}) {
  return (
    <span
      className={`flex items-center gap-1 tabular-nums ${align === 'left' ? 'justify-start' : 'justify-end'} ${
        winner ? 'font-bold text-accent' : 'text-muted'
      }`}
    >
      {winner && align === 'right' && <Trophy className="h-3 w-3" />}
      {value}
      {winner && align === 'left' && <Trophy className="h-3 w-3" />}
    </span>
  )
}

interface BarProps {
  value: number
  max: number
  color: string
  delay: number
  direction: 'left' | 'right'
}

function Bar({ value, max, color, delay, direction }: BarProps) {
  const percentage = Math.min(100, (value / max) * 100)

  return (
    <div
      className={`flex h-2.5 overflow-hidden rounded-full bg-surface-2 ${
        direction === 'left' ? 'justify-end' : 'justify-start'
      }`}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 p-3 text-center">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1 font-display text-lg font-bold">{value}</dd>
    </div>
  )
}
