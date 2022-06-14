import { defineConfig, splitVendorChunkPlugin } from 'vite';
import solid from "vite-plugin-solid";

export default defineConfig({
    plugins: [splitVendorChunkPlugin(), solid()],
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