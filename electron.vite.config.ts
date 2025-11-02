import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import Package from './package.json';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist',
      lib: {
        entry: resolve(__dirname, 'electron/main.ts')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      // outDir: 'dist',
      lib: {
        entry: resolve(__dirname, 'electron/preload.ts')
      }
    }
  },
  renderer: {
    server: { port: 3200 },
    root: './src',
    appType: 'spa',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: resolve(__dirname, 'src/index.html')
      }
    },
    plugins: [
      react(),
      VitePWA({
        mode: 'production',
        disable: false,
        registerType: 'prompt',
        includeAssets: [],
        minify: true,
        manifest: {
          name: Package.name,
          short_name: Package.name,
          description: Package.description,
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'icon'
            },
            {
              src: '/icon-256x256.png',
              sizes: '256x256',
              type: 'image/png',
              purpose: 'icon'
            },
            {
              src: '/icon-384x384.png',
              sizes: '384x384',
              type: 'image/png',
              purpose: 'icon'
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
          theme_color: '#FFFFFF',
          background_color: '#FFFFFF',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait'
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: '*',
              method: 'GET',
              handler: 'CacheFirst' as const,
              options: {
                cacheName: Package.name.concat('-cache'),
                cacheableResponse: { statuses: [200] }
              }
            }
          ]
        }
      })
    ]
  }
});
