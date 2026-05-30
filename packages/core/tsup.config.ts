import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'client/worker-client': 'src/client/worker-client.ts',
    'worklet/index': 'src/worklet/index.ts'
  },
  format: ['esm'],
  dts: true,
  target: 'esnext',
  outDir: 'dist',
  clean: true,
  bundle: true,
  splitting: true,
  sourcemap: false,
  esbuildOptions(options) {
    options.packages = 'external'
  }
})
