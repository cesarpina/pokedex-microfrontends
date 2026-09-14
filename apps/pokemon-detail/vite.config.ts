import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { remotePorts, sharedDependencies } from '../../tools/federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_PATH ?? '/',
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'pokemonDetail',
        filename: 'remoteEntry.js',
        exposes: {
          './PokemonDetail': './src/PokemonDetail.tsx',
          './PokemonCompare': './src/PokemonCompare.tsx',
        },
        shared: sharedDependencies,
        dts: false,
      }),
    ],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: { port: remotePorts.pokemonDetail, strictPort: true, cors: true },
    preview: { port: remotePorts.pokemonDetail, strictPort: true, cors: true },
    build: { target: 'esnext' },
  }
})
