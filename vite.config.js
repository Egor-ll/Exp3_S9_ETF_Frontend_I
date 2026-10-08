import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

export default defineConfig({
  base: '/Exp3_S9_ETF_Frontend_I/',
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()]
    })
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'index.html'),
        games: resolve(process.cwd(), 'games.html'),
        accesorios: resolve(process.cwd(), 'accesorios.html'),
        contacto: resolve(process.cwd(), 'contacto.html')
      }
    }
  }
})