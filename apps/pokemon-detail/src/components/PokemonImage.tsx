import { useEffect, useRef, useState } from 'react'

interface PokemonImageProps {
  src: string
  alt: string
  className?: string
}

export function PokemonImage({ src, alt, className = '' }: PokemonImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [src])

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      className={`${className} transition-[opacity,transform] duration-700 ease-out ${
        loaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}
    />
  )
}
