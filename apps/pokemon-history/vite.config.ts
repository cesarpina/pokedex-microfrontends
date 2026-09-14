import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { remotePorts, sharedDependencies } from '../../tools/federation'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'pokemonHistory',
      filename: 'remoteEntry.js',
      exposes: {
        './PokemonHistory': './src/PokemonHistory.tsx',
      },
      shared: sharedDependencies,
      dts: false,
    }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: remotePorts.pokemonHistory, strictPort: true, cors: true },
  preview: { port: remotePorts.pokemonHistory, strictPort: true, cors: true },
  build: { target: 'esnext' },
})
