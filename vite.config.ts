import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import Package from './package.json';

export default defineConfig({
  server: { port: 3200 },
  plugins: [
    react(),
    tsconfigPaths(),
    electron([
      {
        entry: path.join(__dirname, 'electron/main.ts')
      },
      {
        entry: path.join(__dirname, 'electron/preload.ts'),
        onstart(args) {
          args.reload();
        }
      }
    ]),
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
});
