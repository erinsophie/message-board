import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

const env = dotenv.config({ path: '../.env' }).parsed;

export default defineConfig({
  define: {
    'process.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
  },
  plugins: [react()],
});
