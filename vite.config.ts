import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const deferredVendorChunkPattern = /(?:^|\/)(charts|data-grid|pdf)-.*\.js$/;

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        modulePreload: {
            resolveDependencies(_url, deps, { hostType }) {
                if (hostType !== 'html') {
                    return deps;
                }

                return deps.filter((dep) => !deferredVendorChunkPattern.test(dep));
            },
        },
        rollupOptions: {
            output: {
                onlyExplicitManualChunks: true,
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
