import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [splitVendorChunkPlugin(), svelte({
        compilerOptions: {
            hydratable: false,
        },
    })],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
    },
});