import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import rollupNodePolyFill from 'rollup-plugin-polyfill-node';

export default defineConfig({
    base: './',
    plugins: [
        react(),
        inject({
            modules: {
                Buffer: ['buffer', 'Buffer'],
                process: 'process',
            },
        }),
        rollupNodePolyFill()
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: 'index.html',
        },
    },
    server: {
        port: 3000,
    },
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis'
            },
        }
    },
    resolve: {
        alias: {
            process: 'process/browser',
            buffer: 'buffer',
        },
    },
});
