import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import axios from "axios";
export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/sass/app.css',
                'resources/js/app.js',
                'resources/js/additional_info.js',
            ],
            refresh: true,
        }),
    ],
});
