import { motion } from 'motion/react'
import { useState } from 'react'
import { formatPokedexNumber, formatPokemonName, type PokemonSummary } from '@pokedex/shared'

interface PokemonCardProps {
  pokemon: PokemonSummary
  accent?: string
  delay?: number
  onClick: () => void
}

export function PokemonCard({
  pokemon,
  accent = 'var(--accent)',
  delay = 0,
  onClick,
}: PokemonCardProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex w-full flex-col items-center gap-2 overflow-hidden rounded-2xl bg-surface p-4 text-center shadow-card ring-1 ring-line transition-shadow duration-300 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      aria-label={`Ver detalle de ${formatPokemonName(pokemon.name)}`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: `radial-gradient(circle at 50% 0%, ${accent}, transparent 70%)` }}
      />
      <span className="relative flex h-24 w-24 items-center justify-center">
        {!loaded && <span className="skeleton absolute inset-2 rounded-full" />}
        <img
          src={pokemon.image}
          alt=""
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-contain drop-shadow-lg transition-all duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-3 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </span>
      <span className="relative">
        <span className="block text-xs font-semibold tracking-widest text-muted">
          {formatPokedexNumber(pokemon.id)}
        </span>
        <span className="block truncate font-display text-base font-bold">
          {formatPokemonName(pokemon.name)}
        </span>
      </span>
    </motion.button>
  )
}

export function PokemonCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface p-4 ring-1 ring-line">
      <div className="skeleton h-24 w-24 rounded-full" />
      <div className="skeleton h-3 w-10" />
      <div className="skeleton h-4 w-20" />
    </div>
  )
}
