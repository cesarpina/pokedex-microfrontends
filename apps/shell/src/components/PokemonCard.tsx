import { Check, Scale } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import {
  formatPokedexNumber,
  formatPokemonName,
  selectIsCompared,
  useCompareStore,
  type PokemonSummary,
} from '@pokedex/shared'

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
  const imageRef = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)
  const compared = useCompareStore(selectIsCompared(pokemon.name))
  const toggleCompare = useCompareStore((state) => state.toggle)
  const label = formatPokemonName(pokemon.name)

  useEffect(() => {
    if (imageRef.current?.complete) setLoaded(true)
  }, [pokemon.image])

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-2xl bg-surface shadow-card ring-1 transition-shadow duration-300 hover:shadow-glow ${
        compared ? 'ring-2 ring-accent' : 'ring-line'
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={`Ver detalle de ${label}`}
        className="flex w-full flex-col items-center gap-2 p-4 text-center focus-visible:outline-none"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: `radial-gradient(circle at 50% 0%, ${accent}, transparent 70%)` }}
        />
        <span className="relative flex h-24 w-24 items-center justify-center">
          {!loaded && <span className="skeleton absolute inset-2 rounded-full" />}
          <img
            ref={imageRef}
            src={pokemon.image}
            alt=""
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className={`h-full w-full object-contain drop-shadow-lg transition-all duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-3 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </span>
        <span className="relative">
          <span className="block text-xs font-semibold tracking-widest text-muted">
            {formatPokedexNumber(pokemon.id)}
          </span>
          <span className="block truncate font-display text-base font-bold">{label}</span>
        </span>
      </button>

      <button
        type="button"
        aria-pressed={compared}
        aria-label={compared ? `Quitar ${label} de la comparación` : `Comparar ${label}`}
        title={compared ? 'Quitar de la comparación' : 'Comparar'}
        onClick={() => toggleCompare(pokemon)}
        className={`absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-all duration-300 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
          compared
            ? 'scale-100 bg-accent text-accent-ink opacity-100'
            : 'scale-90 bg-surface text-muted opacity-0 ring-1 ring-line group-hover:scale-100 group-hover:opacity-100 hover:text-accent'
        }`}
      >
        {compared ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
      </button>
    </motion.div>
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
