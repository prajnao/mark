import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        content: "src/content/index.ts",
      },
      output: {
        entryFileNames: "content/index.js",
        assetFileNames: "content/index.css",
      },
    },
  },
});
