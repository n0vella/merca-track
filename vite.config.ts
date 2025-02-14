import preact from '@preact/preset-vite'
import { ConfigEnv, UserConfig, defineConfig } from 'vite'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig((mode: ConfigEnv): UserConfig => {
  return {
    plugins: [tailwindcss(), preact()],
    build: {
      target: 'esnext',
      minify: false,
      outDir: 'dist',
      lib: {
        entry: 'src/index.tsx',
        name: 'index',
        fileName: () => 'index.user.js',
        formats: ['iife'],
      },
      rollupOptions: {
        output: {
          banner: () => fs.readFileSync('src/userscript-header.js', 'utf-8'),
        },
      },
    },
    define: {
      // https://github.com/vitejs/vite/discussions/13587
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  }
})
