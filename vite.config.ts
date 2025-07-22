import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VERCEL ? '/' : env.GH_PAGES ? '/03-react-movies/' : '/'

  return {
    base,
    root: fileURLToPath(new URL('./', import.meta.url)),
    publicDir: fileURLToPath(new URL('./public', import.meta.url)),
    plugins: [react()],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: '/index.html',
      port: 3000,
      strictPort: true,
      host: true
    },
    build: {
      outDir: fileURLToPath(new URL('./dist', import.meta.url)),
      emptyOutDir: true,
      rollupOptions: {
        input: fileURLToPath(new URL('./public/index.html', import.meta.url)),
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    },
    css: {
      modules: {
        localsConvention: 'camelCase'
      }
    }
  }
})