export const styles = `
  :root {
    --bg: #ffffff;
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

    --font-body: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
    --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;

    --measure: 68ch;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0d1117;
      --fg: #e6edf3;
      --fg-muted: #8b949e;
      --border: #30363d;
      --link: #58a6ff;
      --code-bg: #161b22;
      --code-fg: #e6edf3;
      --quote-border: #3d444d;
      --selection: #1f3a5f;
      --sidebar-bg: #0d1117;
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
    // padding: 72px 24px 160px;
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
    // margin: 2em 0 0.6em;
    scroll-margin-top: 24px;
  }

  #mark-content > :first-child {
    margin-top: 0;
  }

  #mark-content h1 { font-size: 2.05em; letter-spacing: -0.025em; }
  #mark-content h2 { font-size: 1.5em; }
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
    border-radius: 4px;
  }

  #mark-content pre {
    background: var(--code-bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;
    margin: 1.5em 0;
    overflow-x: auto;
    line-height: 1.55;
  }

  #mark-content pre code {
    background: none;
    padding: 0;
    border-radius: 0;
    font-size: 0.85em;
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

  #mark-sidebar {
    position: sticky;
    top: 0;
    flex: 0 0 var(--sidebar-w);
    width: var(--sidebar-w);
    height: 100vh;
    overflow-y: auto;
    padding: 24px 8px 40px;
    box-sizing: border-box;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--border);
    font-family: var(--font-body);
    scrollbar-width: thin;
  }

  #mark-sidebar-title {
    padding: 0 12px 16px;
    font-size: 13px;
    font-weight: 600;
    color: var(--fg);
    word-break: break-word;
  }

  #mark-toc {
    display: flex;
    flex-direction: column;
  }

  .mark-toc-link {
    display: block;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 13px;
    line-height: 1.45;
    color: var(--fg-muted);
    text-decoration: none;
    border-left: 2px solid transparent;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mark-toc-link:hover {
    color: var(--fg);
    background: var(--code-bg);
  }

  .mark-toc-link.is-active {
    color: var(--fg);
    border-left-color: var(--link);
    font-weight: 550;
  }

  #mark-toggle {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 10;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
    color: var(--fg-muted);
    font-size: 14px;
    cursor: pointer;
  }

  #mark-toggle:hover {
    color: var(--fg);
  }

  body.sidebar-collapsed #mark-sidebar {
    display: none;
  }

  #mark-main {
    flex: 1;
    min-width: 0;
  }
`;
