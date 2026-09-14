import { ArrowLeft, Ruler, Sparkles, Weight } from 'lucide-react'
import {
  formatPokedexNumber,
  formatPokemonName,
  typeColor,
  type PokemonDetail,
} from '@pokedex/shared'
import { CompareToggle } from './CompareToggle'
import { PokemonImage } from './PokemonImage'
import { StatBar } from './StatBar'
import { TypeBadge } from './TypeBadge'

interface DetailViewProps {
  pokemon: PokemonDetail
  onBack: () => void
}

export function DetailView({ pokemon, onBack }: DetailViewProps) {
  const primaryColor = typeColor(pokemon.types[0])
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.value, 0)

  return (
    <article className="relative animate-pop overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-50"
        style={{
          background: `radial-gradient(60% 70% at 50% 0%, ${primaryColor}, transparent 70%)`,
        }}
      />

      <div className="relative grid gap-8 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative animate-pop" style={{ animationDelay: '0.05s' }}>
            <div
              aria-hidden
              className="absolute -inset-6 rounded-full opacity-50"
              style={{
                background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
              }}
            />
            <PokemonImage
              src={pokemon.image}
              alt={formatPokemonName(pokemon.name)}
              className="relative h-56 w-56 animate-float object-contain drop-shadow-2xl sm:h-64 sm:w-64"
            />
          </div>

          <div
            className="flex animate-pop flex-wrap justify-center gap-2"
            style={{ animationDelay: '0.15s' }}
          >
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <header className="animate-pop" style={{ animationDelay: '0.1s' }}>
            <span className="font-display text-sm font-semibold tracking-[0.3em] text-muted uppercase">
              {formatPokedexNumber(pokemon.id)}
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {formatPokemonName(pokemon.name)}
            </h1>
          </header>

          <dl className="grid animate-pop grid-cols-3 gap-3" style={{ animationDelay: '0.2s' }}>
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
          </dl>

          <section
            aria-labelledby="stats-title"
            className="animate-pop space-y-3"
            style={{ animationDelay: '0.3s' }}
          >
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
          </section>

          <section className="animate-pop space-y-2" style={{ animationDelay: '0.4s' }}>
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
          </section>

          <div className="flex animate-pop flex-wrap gap-3 pt-2" style={{ animationDelay: '0.5s' }}>
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-canvas transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none active:translate-y-0"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Regresar
            </button>
            <CompareToggle pokemon={{ id: pokemon.id, name: pokemon.name, image: pokemon.image }} />
          </div>
        </div>
      </div>
    </article>
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
