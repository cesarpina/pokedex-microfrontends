import { ArrowLeft, Ruler, Sparkles, Weight } from 'lucide-react'
import { motion } from 'motion/react'
import {
  formatPokedexNumber,
  formatPokemonName,
  typeColor,
  type PokemonDetail,
} from '@pokedex/shared'
import { PokemonImage } from './PokemonImage'
import { StatBar } from './StatBar'
import { TypeBadge } from './TypeBadge'

interface DetailViewProps {
  pokemon: PokemonDetail
  onBack: () => void
}

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export function DetailView({ pokemon, onBack }: DetailViewProps) {
  const primaryColor = typeColor(pokemon.types[0])
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.value, 0)

  return (
    <motion.article
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60 blur-3xl"
        style={{
          background: `radial-gradient(60% 80% at 50% 0%, ${primaryColor}, transparent 70%)`,
        }}
      />

      <div className="relative grid gap-8 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col items-center gap-6">
          <motion.div variants={item} className="relative">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full opacity-40 blur-2xl"
              style={{ backgroundColor: primaryColor }}
            />
            <PokemonImage
              src={pokemon.image}
              alt={formatPokemonName(pokemon.name)}
              className="relative h-56 w-56 animate-float object-contain drop-shadow-2xl sm:h-64 sm:w-64"
            />
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <motion.header variants={item}>
            <span className="font-display text-sm font-semibold tracking-[0.3em] text-muted uppercase">
              {formatPokedexNumber(pokemon.id)}
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {formatPokemonName(pokemon.name)}
            </h1>
          </motion.header>

          <motion.dl variants={item} className="grid grid-cols-3 gap-3">
            <Fact
              icon={<Ruler className="h-4 w-4" />}
              label="Altura"
              value={`${pokemon.height / 10} m`}
            />
            <Fact
              icon={<Weight className="h-4 w-4" />}
              label="Peso"
              value={`${pokemon.weight / 10} kg`}
            />
            <Fact
              icon={<Sparkles className="h-4 w-4" />}
              label="Total"
              value={String(totalStats)}
            />
          </motion.dl>

          <motion.section variants={item} aria-labelledby="stats-title" className="space-y-3">
            <h2 id="stats-title" className="font-display text-lg font-bold">
              Estadísticas base
            </h2>
            <ul className="space-y-3">
              {pokemon.stats.map((stat, index) => (
                <StatBar
                  key={stat.name}
                  stat={stat}
                  color={primaryColor}
                  delay={0.3 + index * 0.06}
                />
              ))}
            </ul>
          </motion.section>

          <motion.section variants={item} className="space-y-2">
            <h2 className="font-display text-lg font-bold">Habilidades</h2>
            <ul className="flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <li
                  key={ability}
                  className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-muted"
                >
                  {formatPokemonName(ability)}
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.div variants={item} className="pt-2">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Regresar
            </button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

interface FactProps {
  icon: React.ReactNode
  label: string
  value: string
}

function Fact({ icon, label, value }: FactProps) {
  return (
    <div className="rounded-2xl bg-surface-2 p-3">
      <dt className="flex items-center gap-1.5 text-xs font-medium text-muted">
        {icon}
        {label}
      </dt>
      <dd className="mt-1 font-display text-lg font-bold">{value}</dd>
    </div>
  )
}
