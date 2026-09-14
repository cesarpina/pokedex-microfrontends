import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { remotePorts, sharedDependencies } from '../../tools/federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const detailUrl = env.VITE_POKEMON_DETAIL_URL ?? `http://localhost:${remotePorts.pokemonDetail}`
  const historyUrl =
    env.VITE_POKEMON_HISTORY_URL ?? `http://localhost:${remotePorts.pokemonHistory}`

  return {
    base: env.VITE_BASE_PATH ?? '/',
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'shell',
        remotes: {
          pokemonDetail: {
            type: 'module',
            name: 'pokemonDetail',
            entry: `${detailUrl}/remoteEntry.js`,
          },
          pokemonHistory: {
            type: 'module',
            name: 'pokemonHistory',
            entry: `${historyUrl}/remoteEntry.js`,
          },
        },
        shared: sharedDependencies,
        dts: false,
      }),
    ],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: { port: remotePorts.shell, strictPort: true },
    preview: { port: remotePorts.shell, strictPort: true },
    build: { target: 'esnext' },
  }
})
