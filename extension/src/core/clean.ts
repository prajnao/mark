import DOMPurify from "dompurify";


  // Removes a YAML front matter block from the start of a document.
export function removeFrontMatter(markdown: string): string {
  const frontMatterRegex = /^---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(\r?\n|$)/;
  return markdown.replace(frontMatterRegex, "");
}

const SAFE_KATEX_STYLE = /^[a-z0-9\s:;.,%\-()#]*$/i;

let hooksRegistered = false;

function registerKatexHooks(): void {
  if (hooksRegistered) return;
  hooksRegistered = true;

  DOMPurify.addHook("uponSanitizeElement", (node) => {
    const element = node as Element;

    // Text nodes and comments have no closest method.
    if (typeof element.closest !== "function") return;

    if (element.closest(".katex, .katex-display")) {
      element.setAttribute("data-katex", "");
    }
  });

  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if (data.attrName !== "style") return;

    const element = node as Element;
    if (typeof element.hasAttribute !== "function") return;

    // Not KaTeX output. The style is removed as normal.
    if (!element.hasAttribute("data-katex")) return;

    if (SAFE_KATEX_STYLE.test(data.attrValue)) {
      data.forceKeepAttr = true;
    }
  });
}

export function purifyHtml(html: string): string {
  registerKatexHooks();

  return DOMPurify.sanitize(html, {
    USE_PROFILES: {
      html: true,
      svg: true,
      svgFilters: true,
      mathMl: true,
    },

  
    ADD_TAGS: ["input"],


    ADD_ATTR: [
      "id",
      "class",
      "data-lang",
      "data-katex",
      "aria-hidden",
      "type",
      "checked",
      "disabled",
      "target",
      "rel",
      "start",
    ],

 
    FORBID_TAGS: ["iframe", "object", "embed", "form", "style"],

    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover"],

    FORBID_CONTENTS: ["form"],
  });
}