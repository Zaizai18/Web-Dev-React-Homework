import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

export default defineConfig({
  base: '/Web-Dev-React-Homework/', 
  plugins: [
    react(),
    tailwindcss(), 
  ],
})