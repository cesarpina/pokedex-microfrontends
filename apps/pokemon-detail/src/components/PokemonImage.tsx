import { useState } from 'react'

interface PokemonImageProps {
  src: string
  alt: string
  className?: string
}

export function PokemonImage({ src, alt, className = '' }: PokemonImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      className={`${className} transition-all duration-700 ease-out ${
        loaded ? 'scale-100 opacity-100 blur-0' : 'scale-90 opacity-0 blur-md'
      }`}
    />
  )
}
