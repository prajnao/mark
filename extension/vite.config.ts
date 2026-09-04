import { defineConfig, type Plugin } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" with { type: "json" };

function stripKatexFontFaces(): Plugin {
  return {
    name: "strip-katex-font-faces",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("katex.min.css")) return null;
      return { code: code.replace(/@font-face\s*\{[^}]*\}/g, ""), map: null };
    },
  };
}

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

export default defineConfig({
  plugins: [stripKatexFontFaces(), crx({ manifest }), forceAscii()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});