export const styles = `
  :root {
    --bg: #ffffff;
    --bg-hover:rgb(240, 240, 240);
    --fg: #1a1a1a;
    --fg-muted: #6b7280;
    --border: #e5e7eb;
    --link: #2563eb;
    --code-bg: #f6f8fa;
    --code-fg: #24292f;
    --quote-border: #d1d5db;
    --selection: #dbeafe;
    --sidebar-w: 260px;
    --sidebar-bg: #fafafa;
    --primary:  #ff869c;

    --font-body: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;

    --measure: 68ch;

  
   --bar-color:rgb(180, 180, 180);
   --rail-hover-bg:#f0f0f0;
  --panel-bg: #ffffff;
  --rail-w: 24px;
  --panel-w: 260px;
  --bar-max: 12px;
  --bar-step: 3px;
  --bar-min: 6px;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #191919;
      --bg-hover:rgb(41, 41, 41);
      --fg: #e6edf3;
      --fg-muted:rgb(159, 159, 159);
      --border: rgb(64, 64, 64);
      --link: #58a6ff;
      --code-bg: #202020;
      --code-fg: #e6edf3;
      --quote-border: #3d444d;
      --selection: #1f3a5f;
      --sidebar-bg: #0d1117;
      --bar-color:rgb(84, 84, 91);
      --rail-hover-bg: #202020;
      --panel-bg: #191919;
    }
  }

  html, body {
    margin: 0;
    padding: 0;
    background: var(--bg);
  }

  ::selection {
    background: var(--selection);
  }

  #mark-root {
    max-width: var(--measure);
    margin: 0 auto;
    padding: 20px 0px;
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.5;
    color: var(--fg);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  /* Headings */
  #mark-content h1,
  #mark-content h2,
  #mark-content h3,
  #mark-content h4,
  #mark-content h5,
  #mark-content h6 {
    line-height: 1.25;
    font-weight: 650;
    letter-spacing: -0.015em;
    scroll-margin-top: 24px;
  }

  #mark-content h1 { font-size: 30px; letter-spacing: -0.025em; }
  #mark-content h2 { font-size: 24px; }
  #mark-content h3 { font-size: 1.2em; }
  #mark-content h4 { font-size: 1em; }
  #mark-content h5,
  #mark-content h6 { font-size: 0.9em; color: var(--fg-muted); }

  /* Text */
  #mark-content p {
    margin: 0 0 1.2em;
  }

  #mark-content a {
    color: var(--link);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
  }

  #mark-content strong { font-weight: 650; }

  #mark-content hr {
    border: 0;
    border-top: 1px solid var(--border);
    margin: 2.5em 0;
  }

  /* Lists */
  #mark-content ul,
  #mark-content ol {
    margin: 0 0 1.2em;
    padding-left: 1.5em;
  }

  #mark-content li {
    margin: 0.3em 0;
  }

  #mark-content li > ul,
  #mark-content li > ol {
    margin: 0.3em 0 0.3em;
  }

  /* Quote */
  #mark-content blockquote {
    margin: 1.5em 0;
    padding: 0 0 0 1.1em;
    border-left: 3px solid var(--quote-border);
    color: var(--fg-muted);
  }

  #mark-content blockquote p:last-child {
    margin-bottom: 0;
  }

  /* Code */
  #mark-content code {
    font-family: var(--font-mono);
    font-size: 0.875em;
    background: var(--code-bg);
    color: var(--code-fg);
    padding: 0.15em 0.4em;
    // border-radius: 4px;
    border:none;
  }

  #mark-content pre {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    margin: 1.5em 0;
    overflow-x: auto;
    line-height: 1.55;
     border:none;
  }

  #mark-content pre code {
    background: none;
    padding: 0;
    border-radius: 0;
    font-size: 0.85em;
     border:none;
  }

  /* Table */
  #mark-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 0.94em;
  }

  #mark-content th,
  #mark-content td {
    border: 1px solid var(--border);
    padding: 8px 12px;
    text-align: left;
  }

  #mark-content th {
    background: var(--code-bg);
    font-weight: 600;
  }

  /* Media */
  #mark-content img,
  #mark-content svg {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
  }


  #mark-shell {
    display: flex;
    align-items: flex-start;
  }

  #mark-toc-pill {
    position:fixed;
    height:fit-content;
}


#mark-sidebar {
    position: fixed;
    // top: 10%;
    height:100vh;
    // flex: 0 0 calcx(var(--rail-w) + var(--panel-w) + 20px);
    // max-height: 80vh;
    // overflow-y: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    box-sizing: border-box;
    font-family: var(--font-body);
  }

  /* Rail */
  #mark-toc-rail {
    flex: 0 0 var(--rail-w);
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding:12px 2px;
    border-radius:8px;
    align-items:center;
        cursor:pointer;
        transition:background-color 180ms ease-out;
  }

  #mark-toc-rail:hover{
  background: var(--rail-hover-bg);
  transform:background-color;
  }

  .mark-toc-bar {
    all: unset;
    box-sizing: border-box;
    display: block;
    height: 1.8px;
    border-radius: 1px;
    background: var(--bar-color);
    width: max(
      var(--bar-min),
      calc(var(--bar-max) - var(--depth) * var(--bar-step))
    );
    opacity: calc(1 - var(--depth) * 0.15);
    transition: background 120ms ease, opacity 120ms ease;
  }

  .mark-toc-bar.is-active {
    // background: var(--fg);
    background:var(--primary);
  }

  /* Panel */

  #mark-toc-panel {
    flex: 0 0 var(--panel-w);
    max-height: 80vh;
    overflow-y: auto;
    padding: 14px 8px;
    box-sizing: border-box;
    background: var(--panel-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    scrollbar-width: thin;
    
    opacity: 1;
    transform: translateX(0) scale(1);
    transition:
      opacity 180ms ease,
      transform 220ms cubic-bezier(0.32, 0.72, 0, 1),
      visibility 0s;
  }

  #mark-sidebar-title {
    padding: 0 10px 10px;
    font-size: 10px;
    // letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--fg-muted);
  }

  #mark-toc {
    display: flex;
    flex-direction: column;
  }

  .mark-toc-link {
    display: block;
    padding: 5px 10px 5px calc(10px + var(--depth) * 14px);
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--fg-muted);
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 120ms ease, background 120ms ease;
  }

  .mark-toc-link.is-active {
    // color: var(--fg);
    color:var(--primary);
    font-weight: 550;
  }

//   body.sidebar-collapsed #mark-toc-panel {
//     display: none;
//   }
body.sidebar-collapsed #mark-toc-panel {
    opacity: 0;
    transform: translateX(-8px) scale(0.98);
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 140ms ease,
      transform 180ms ease,
      visibility 0s 180ms;
  }

  @media (prefers-reduced-motion: reduce) {
    .mark-toc-bar,
    .mark-toc-link {
      transition: none;
    }
  }


  #mark-toc {
    display: flex;
    flex-direction: column;
  }

  .mark-toc-link:hover {
    // color: var(--fg);
    color:var(--primary);
    background: var(--bg-hover);
  }

  #mark-toggle:hover {
    color: var(--fg);
  }

  #mark-main {
    flex: 1;
    min-width: 0;
  }
`;
