import { purifyHtml, removeFrontMatter } from "../core/clean";
import { renderMarkdown } from "../core/parser";
import { getHeadings } from "../ui/toc";
// import { styles } from "../styles/style.ts";
import styles from "../styles/style.css?inline";
import { applyStoredCollapse, buildSidebar, trackActiveHeading } from "../ui/sidebar";
import { enhanceCodeBlocks } from "../ui/code-block.ts";

console.log("My Markdown preview extension is running, gg!");



function addStyles(): void {
  const style = document.createElement("style");
  style.textContent = styles;
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
  
    onReady(() => {
      try {
        const text = getRawText();
        const markdown = removeFrontMatter(text);
        const rendered = renderMarkdown(markdown);
        console.log("PARSED:", rendered.slice(0, 600));
        const html = purifyHtml(rendered);
        console.log("PURIFIED:", html.slice(0, 600));

        
    
        document.title = getFileName();
        addStyles();
    
        const content = buildView(html);
        enhanceCodeBlocks(content);
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


  function getFileName():string{
    const path=decodeURIComponent(location.pathname);
    const fileName=path.split("/").pop() ?? "Document";
    return fileName;
  }









