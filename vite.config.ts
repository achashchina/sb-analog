/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { resolve } from '@angular/compiler-cli';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      {find: '~primeng', replacement: resolve(__dirname, 'node_modules/primeng')}
    ]
  },
  plugins: [
    analog({
      content: {
        highlighter: 'shiki',
      },
      prerender: {
        routes: [
         
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
