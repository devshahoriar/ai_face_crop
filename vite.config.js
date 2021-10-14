import { defineConfig } from "vite";
export default defineConfig({
  build: {
    target: 'chrome90',
    rollupOptions: {external: true},
  },
});
