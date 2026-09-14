import { Check, Scale } from 'lucide-react'
import { selectIsCompared, useCompareStore, type PokemonSummary } from '@pokedex/shared'

export function CompareToggle({ pokemon }: { pokemon: PokemonSummary }) {
  const compared = useCompareStore(selectIsCompared(pokemon.name))
  const toggle = useCompareStore((state) => state.toggle)

  return (
    <button
      type="button"
      aria-pressed={compared}
      onClick={() => toggle(pokemon)}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold ring-1 transition-all duration-300 hover:-translate-y-0.5 ${
        compared
          ? 'bg-accent text-accent-ink ring-accent'
          : 'bg-surface-2 text-ink ring-transparent hover:ring-accent/40'
      }`}
    >
      {compared ? <Check className="h-4 w-4" /> : <Scale className="h-4 w-4" />}
      {compared ? 'En comparación' : 'Comparar'}
    </button>
  )
}
