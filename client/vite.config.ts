import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteAliases } from 'vite-aliases';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteAliases()],
  build: {
    outDir: '../crm/public',
  },
  publicDir: './public',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/',
        changeOrigin: true,
      },
    },
  },
});
