import { purifyHtml, removeFrontMatter } from "../core/clean";
import { renderMarkdown } from "../core/parser";
import { getHeadings } from "../ui/toc";
import styles from "../styles/style.css?inline";
import {
  applyStoredCollapse,
  buildSidebar,
  trackActiveHeading,
} from "../ui/sidebar";
import { enhanceCodeBlocks } from "../ui/code-block.ts";
// import katexStyles from "katex/dist/katex.min.css?inline";
import katexBase from "katex/dist/katex.min.css?inline";
import katexFonts from "../styles/katex-fonts.css?inline";
import { renderDiagrams } from "../ui/mermaid.ts";
// import { applyStoredTheme, watchThemeChanges } from "../ui/theme.ts";
import {
  applyStoredAppearance,
  watchAppearanceChanges,
} from "../ui/appearance.ts";
import { buildFullScreenButton } from "../ui/fullscreen.ts";

// const katexCss = katexBase.replace(/@font-face\s*\{[^}]*\}/g, "");
// const katexCss = katexBase.replace(/@font-face\s*\{[^}]*\}/g, "") + katexFonts;
const katexCss = katexBase + katexFonts;

console.log("My Markdown preview extension is running, gg!");

function setFavicon(): void {
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = chrome.runtime.getURL("icons/icon-32.png");
  document.head.appendChild(link);
}

function addStyles(): void {
  const style = document.createElement("style");
  style.textContent = styles + katexCss;
  document.head.appendChild(style);
}

let hideStyle: HTMLStyleElement | null = null;

function hideBody(): void {
  hideStyle = document.createElement("style");
  hideStyle.textContent = "body{display:none !important;}";
  document.documentElement.appendChild(hideStyle);
}

// hideBody();

// setInterval(reveal, 1000);

function reveal(): void {
  hideStyle?.remove();
  hideStyle = null;
}

function onReady(callback: () => void): void {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
  } else {
    callback();
  }
}

function getRawText(): string {
  const preElement = document.querySelector("pre");
  const text = preElement?.textContent
    ? preElement.textContent
    : document.body.textContent;
  return text.replace(/^\uFEFF/, "");
}

function buildView(html: string): HTMLElement {
  document.body.innerHTML = "";

  const shell = document.createElement("div");
  shell.id = "mark-shell";

  const main = document.createElement("div");
  main.id = "mark-main";

  const root = document.createElement("div");
  root.id = "mark-root";

  const content = document.createElement("div");
  content.id = "mark-content";
  content.innerHTML = html;

  root.appendChild(content);
  main.appendChild(root);
  shell.appendChild(main);
  document.body.appendChild(shell);

  return content;
}

function main(): void {
  hideBody();
  setTimeout(reveal, 2000);

  onReady(async () => {
    try {
      // await applyStoredTheme();
      // watchThemeChanges();
      // earlier just theme is now replaced by appearance
      await applyStoredAppearance();
      watchAppearanceChanges();
      

      const text = getRawText();
      const markdown = removeFrontMatter(text);
      const rendered = renderMarkdown(markdown);
      console.log("PARSED:", rendered.slice(0, 600));
      const html = purifyHtml(rendered);
      console.log("PURIFIED:", html.slice(0, 600));

      setFavicon();

      document.title = getFileName();
      addStyles();

      const content = buildView(html);
      document.body.appendChild(buildFullScreenButton());
      enhanceCodeBlocks(content);
      void renderDiagrams(content);
      const headings = getHeadings(content);

      if (headings.length > 0) {
        const shell = document.getElementById("mark-shell")!;
        shell.insertBefore(buildSidebar(headings), shell.firstChild);
        // document.body.appendChild(buildToggle());
        trackActiveHeading(headings);
      }

      void applyStoredCollapse();
    } catch (error) {
      console.error("[md-viewer]", error);
    } finally {
      reveal();
    }
  });
}

main();

function getFileName(): string {
  const path = decodeURIComponent(location.pathname);
  const fileName = path.split("/").pop() ?? "Document";
  return fileName;
}
