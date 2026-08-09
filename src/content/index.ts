console.log("My Markdown preview extension is running!");

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

function buildView(text: string): void {
  document.body.innerHTML = "";

  const root = document.createElement("div");
  root.id = "mark-root";

  const content = document.createElement("pre");
  content.id = "mark-viewer-content";
  content.textContent = text;

  root.appendChild(content);
  document.body.appendChild(root);
}

function addStyles(): void {
    const style = document.createElement("style");
    style.textContent = `
      #mark-viewer-root {
        max-width: 720px;
        margin: 0 auto;
        padding: 64px 24px;
        font-family: ui-sans-serif, system-ui, sans-serif;
        font-size: 16px;
        line-height: 1.7;
        color: #1a1a1a;
      }
      #mark-viewer-content {
        white-space: pre-wrap;
        word-break: break-word;
        font-family: inherit;
        margin: 0;
         background-color: lightblue;
      }
    `;
    document.head.appendChild(style);
  }

function main(): void {
    hideBody();
    setTimeout(reveal, 2000);
  
    onReady(() => {
      try {
        const text = getRawText();
        const documentTitle=getFileName();
        console.log(documentTitle);
        addStyles();
        buildView(text);
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