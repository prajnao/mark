import mermaid from "mermaid";

let initialised = false;

// function currentTheme(): "default" | "dark" {
//   const root = document.documentElement;

//   if (root.classList.contains("theme-dark")) return "dark";
//   if (root.classList.contains("theme-light")) return "default";

//   return window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "default";
// }

function currentTheme(): "default" | "dark" {
  return document.documentElement.dataset.base === "dark" ? "dark" : "default";
}

function init(): void {
  if (initialised) return;
  initialised = true;

  mermaid.initialize({
    startOnLoad: false,
    theme: currentTheme(),
    securityLevel: "strict",
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    fontSize: 14,
  });
}

export async function renderDiagrams(root: HTMLElement): Promise<void> {
  const blocks = root.querySelectorAll<HTMLElement>("pre.mermaid-source");
  if (blocks.length === 0) return;

  init();

  let index = 0;

  for (const block of blocks) {
    const source = block.textContent ?? "";
    const id = `mermaid-${Date.now()}-${index++}`;

    const container = document.createElement("div");
    container.className = "mark-mermaid";
    container.dataset.source = source;

    try {
      const { svg } = await mermaid.render(id, source);
      container.innerHTML = svg;
      block.replaceWith(container);
    } catch (error) {
      // Mermaid leaves its temporary element behind on failure.
      document.getElementById(id)?.remove();
      document.getElementById(`d${id}`)?.remove();
      
      container.className = "mark-mermaid is-error";

      const message = document.createElement("div");
      message.className = "mark-mermaid-error";
      message.textContent = "This diagram could not be rendered.";

      const fallback = document.createElement("pre");
      fallback.textContent = source;

      container.appendChild(message);
      container.appendChild(fallback);
      block.replaceWith(container);

      console.warn("[mark] mermaid render failed", error);
    }
  }
}


/**
 * Mermaid writes colours into the SVG rather than reading CSS variables,
 * so a theme change means regenerating every diagram from its source.
 */
export async function reRenderDiagrams(): Promise<void> {
  const containers = document.querySelectorAll<HTMLElement>(".mark-mermaid");
  if (containers.length === 0) return;

  // init() guards on `initialised`, so without resetting it the new theme
  // never reaches mermaid.initialize and we re-render with the old colours.
  initialised = false;
  init();

  let index = 0;

  for (const container of containers) {
    const source = container.dataset.source;
    if (!source) continue;

    const id = `mermaid-rerender-${Date.now()}-${index++}`;

    try {
      const { svg } = await mermaid.render(id, source);
      container.className = "mark-mermaid";
      container.innerHTML = svg;
    } catch {
      document.getElementById(id)?.remove();
      document.getElementById(`d${id}`)?.remove();
      // Leave whatever is currently rendered in place.
    }
  }
}