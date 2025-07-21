import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isProduction = mode === 'production'
  const isVercel = env.VERCEL === '1'
  const isGhPages = env.GH_PAGES === '1'

  
  const base = isVercel ? '/' : 
              isGhPages ? '/03-react-movies/' : 
              '/'

  return {
    base,
    plugins: [react()],
    server: {
      open: true,
      port: 3000,
      strictPort: true
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
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
    },
    define: {
      'import.meta.env.BASE_URL': JSON.stringify(base)
    }
  }
})