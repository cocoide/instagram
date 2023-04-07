import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  server: {
    hmr: {
      host: 'localhost',
    },
  },
  build: {
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/index.tsx'],
      refresh: true,
    }),
    react(),
    tsconfigPaths(),
    chunkSplitPlugin(),
    visualizer(),
  ],
  resolve: {
    alias: {
      '@': 'resources/js',
    },
  },
})
