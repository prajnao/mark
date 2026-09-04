import { defineConfig, type Plugin } from "vite";

function forceAscii(): Plugin {
  return {
    name: "force-ascii",
    generateBundle(_options, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== "chunk") continue;
        file.code = file.code.replace(
          /[\u0080-\uFFFF]/g,
          (char) => "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0"),
        );
      }
    },
  };
}

function dropFontAssets(): Plugin {
  return {
    name: "drop-font-assets",
    generateBundle(_options, bundle) {
      for (const [name, file] of Object.entries(bundle)) {
        if (file.type === "asset" && /\.(woff2?|ttf|eot)$/i.test(name)) {
          delete bundle[name];
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [forceAscii(), dropFontAssets()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        content: "src/content/index.ts",
        popup:"src/popup/index.html"
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === "content" ? "content/index.js" : "popup/[name].js",
        assetFileNames: "content/[name][extname]",
        format: "es",
        inlineDynamicImports: true,
      },
    },
  },
});
