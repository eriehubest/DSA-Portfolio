import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import restart from 'vite-plugin-restart'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl';

// https://vite.dev/config/
export default defineConfig({
    base: '/DSA-Portfolio/',
    plugins: [
        react(),
        tailwindcss(),
        glsl(),
        restart(
            {
                restart: ['../public/**']
            }
        )
    ],
})
