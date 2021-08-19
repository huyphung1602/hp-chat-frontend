import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    port: 8080,
    proxy: {
      // string shorthand
      "/messages": "http://localhost:3000/api/v1/",
      "/sign_up": "http://localhost:3000/api/v1/",
    }
  },
})