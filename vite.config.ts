import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: 'public/index.html',
        },
    },
    server: {
        port: 3000,
    },
});
