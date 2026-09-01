import MarkdownIt from "markdown-it";
import hljs from "highlight.js/lib/core";
import { slugify } from "./slugify";
import taskLists from 'markdown-it-task-lists';
import footnote from 'markdown-it-footnote';

import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import xml from "highlight.js/lib/languages/xml";
import markdown from "highlight.js/lib/languages/markdown";
import rust from "highlight.js/lib/languages/rust";
import go from "highlight.js/lib/languages/go";
import sql from "highlight.js/lib/languages/sql";
import yaml from "highlight.js/lib/languages/yaml";

const LANGUAGES: Record<string, unknown> = {
  typescript,
  javascript,
  python,
  json,
  bash,
  css,
  xml,
  markdown,
  rust,
  go,
  sql,
  yaml,
};

for (const [name, language] of Object.entries(LANGUAGES)) {
  hljs.registerLanguage(name, language as never);
}

const ALIASES: Readonly<Record<string, string>> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  py: "python",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  html: "xml",
  svg: "xml",
  md: "markdown",
  yml: "yaml",
  rs: "rust",
  golang: "go",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlight(code: string, info: string): string {
  const raw = (info ?? "").trim().split(/\s+/)[0].toLowerCase();
  const lang = ALIASES[raw] ?? raw;
  const known = lang.length > 0 && hljs.getLanguage(lang) !== undefined;
  const label = known ? lang : raw || "text";

  const body = known
    ? hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
    : escapeHtml(code);

  return `<pre data-lang="${escapeHtml(label)}"><code class="hljs">${body}</code></pre>`;
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: false,
  highlight,
});


// support task list and footnotes 
// md.use(taskLists, {enabled:false,label:true})
md.use(taskLists, {enabled:false,label:true});
md.use(footnote);

md.core.ruler.push("heading_id", (state) => {
  const used = new Map<string, number>();

  for (let i = 0; i < state.tokens.length; i++) {
    const token = state.tokens[i];
    if (token.type !== "heading_open") continue;

    const text = state.tokens[i + 1]?.content ?? "";
    const base = slugify(text);

    const count = used.get(base) ?? 0;
    used.set(base, count + 1);

    token.attrSet("id", count === 0 ? base : `${base}-${count}`);
  }

  return true;
});


export function renderMarkdown(source: string): string {
  return md.render(source);
}