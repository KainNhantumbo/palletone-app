import { defineConfig } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import electron from "vite-plugin-electron/simple";
import { VitePWA } from "vite-plugin-pwa";
import Package from "./package.json";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        entry: "electron/main.ts"
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts")
      },
      renderer: {}
    }),
    VitePWA({
      mode: "production",
      disable: false,
      registerType: "prompt",
      includeAssets: [],
      minify: true,
      manifest: {
        name: Package.name,
        short_name: Package.name,
        description: Package.description,
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "icon"
          },
          {
            src: "/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "icon"
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "icon"
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        start_url: "/?r=default-colors",
        scope: "/",
        display: "standalone",
        orientation: "portrait"
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: "*",
            method: "GET",
            handler: "CacheFirst" as const,
            options: {
              cacheName: Package.name.concat("-cache"),
              cacheableResponse: { statuses: [200] }
            }
          }
        ]
      }
    })
  ]
});
