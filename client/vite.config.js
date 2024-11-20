import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({





  plugins: [react(), ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
  
      output: {

        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },  
  server :{
    port : 3000,
  }
  // server: {
  //   // host: '192.168.16.128',
  //   port: 6000,
  //   // proxy: {
    
  //   //   '/api': {
  //   //     target: '',
  //   //     changeOrigin: true,
  //   //     rewrite: (path) => path.replace(/^\/api/, ''),
  //   //   },
  //   // },
  // },
});
