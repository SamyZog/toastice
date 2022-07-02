import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    include: ["./src/core"]
  })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/core/index.ts'),
      name: 'Toastice',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React'
        }
      }
    }
  }
})
