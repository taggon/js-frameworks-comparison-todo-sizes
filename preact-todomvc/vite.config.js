import { defineConfig, splitVendorChunkPlugin } from 'vite';
import preact from "@preact/preset-vite";

export default defineConfig({
    plugins: [splitVendorChunkPlugin(), preact()],
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