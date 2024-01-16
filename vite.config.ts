import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import electron from 'vite-plugin-electron/simple';

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react(),
    tsconfigPaths(),
    electron({
      main: {
        entry: 'electron/main.ts'
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts')
      },
      renderer: {}
    })
  ]
});
