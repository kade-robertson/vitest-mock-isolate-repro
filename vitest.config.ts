import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
    },
  },
  test: {
    globals: true,
    isolate: false,
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    sequence: {
      sequencer: (
        await import('./alphabetical-sequencer')
      ).default,
    },
  },
})
