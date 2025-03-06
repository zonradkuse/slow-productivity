import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      id: "slow.productivity.nl.familie-neuhaus.dev",
      name: 'Slow Productivity',
      short_name: 'Slow Productivity',
      description: 'Slow Productivity',
      theme_color: '#497d00',
      display: 'standalone'
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    }
  })],
  server: {
    allowedHosts: ['dev1.nl.familie-neuhaus.dev', '.dev']
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
})
