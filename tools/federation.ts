export const sharedDependencies = {
  react: { singleton: true, requiredVersion: '^19.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
  '@tanstack/react-query': { singleton: true, requiredVersion: '^5.0.0' },
  zustand: { singleton: true, requiredVersion: '^5.0.0' },
  '@pokedex/shared': { singleton: true, requiredVersion: false },
} as const

export const remotePorts = {
  shell: 3000,
  pokemonDetail: 3001,
  pokemonHistory: 3002,
} as const
