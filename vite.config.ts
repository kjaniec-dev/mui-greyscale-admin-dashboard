import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('@react-pdf/') || id.includes('yoga-layout')) {
                        return 'pdf';
                    }

                    if (id.includes('@mui/x-data-grid')) {
                        return 'data-grid';
                    }

                    if (id.includes('@mui/x-charts')) {
                        return 'charts';
                    }

                    if (id.includes('@hello-pangea/dnd')) {
                        return 'dnd';
                    }

                    return undefined;
                },
            },
        },
    },
});
