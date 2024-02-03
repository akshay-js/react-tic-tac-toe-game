import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path for the application (GitHub Pages deployment)
  base: '/react-tic-tac-toe-game/', // Replace with your GitHub repository name

  // Development server configuration
  server: {
    port: 3000, // Specify the port for the development server
  },

  // Build configuration
  build: {
    outDir: 'dist', // Output directory for the production build
  },

  // Configure CSS pre-processing
  css: {
    preprocessorOptions: {
      // Add any CSS preprocessor options here
    },
  },

  // Configure other Vite options as needed
});
