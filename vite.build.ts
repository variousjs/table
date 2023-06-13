import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: './dist',
    rollupOptions: {
      external: ["react"],
    },
    minify: false,
    lib: {
      entry: './src/table/index.tsx',
      formats: ['cjs', 'es'],
      fileName: 'index',
    },
  },
})
