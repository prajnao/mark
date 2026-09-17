<!-- ![Mark](website/public/logo.png) -->
<p align="left">
  <img src="website/public/logo.png" alt="Mark" width="150">
</p>


[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Install-4285F4?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/mark/mlakoabceocimmnfohpmpjojmgdgijbp)

Read markdown as rich documents, right in your browser.

Double-click a `.md` file and read it like a document, not source code.

[Install for Chrome](https://chromewebstore.google.com/detail/mark/mlakoabceocimmnfohpmpjojmgdgijbp) · [Website](https://mark.prajnaprabhu.com) · [Changelog](extension/CHANGELOG.md)

## Features

**Reading**

- Opens local `.md` and `.markdown` files by double-click
- Contents rail built from your headings, with click-to-jump and live position
- Floating or fixed sidebar, whichever suits the document
- Fullscreen mode that hides the browser chrome
- Read-only — your file is never modified

**Appearance**

- Six themes — White, Paper, and Dawn for light; Carbon, Ink, and Onyx for dark
- Follows your system theme, remembering a preset for each mode
- Font, text size, and line spacing controls
- Adjustable content width, from a narrow column to full screen

**Markdown**

- GitHub Flavored Markdown — tables, task lists, footnotes, strikethrough, automatic links
- Syntax highlighting with a language label and copy button
- Math with KaTeX, inline and block
- Mermaid diagrams
- SVG and safe embedded HTML

**Privacy**

- Local-first — nothing is uploaded, no server, no account
- Every document sanitized before it renders
- Free and open source

## After install

A setup guide opens automatically when you install Mark and walks you
through the steps below. This is the same thing, for reference.

### 1. Allow access to local files

Chrome blocks all extension access to local files by default, so Mark
cannot read your `.md` files until you turn this on.

1. Go to `chrome://extensions`
2. Find Mark and click **Details**
3. Turn on **Allow access to file URLs**

Mark only reads files you open, and nothing leaves your browser.

### 2. Set Chrome as the default app for Markdown

**macOS** — Right-click any `.md` file → Get Info → Open with → Google Chrome → Change All

**Windows** — Right-click any `.md` file → Open with → Choose another app → Google Chrome → check **Always use this app**

Then double-click any `.md` file.

## Supported browsers

Chrome, Edge, Brave, Arc, Opera, and similar browsers.

Firefox and Safari support is planned.

## Development

```bash
pnpm install
pnpm dev      # build and watch
pnpm build    # production build
```

Load the unpacked extension from `extension/dist` at `chrome://extensions` with Developer mode on.

Note that unpacked installs get file access by default, while Web Store
installs do not. To test anything related to file permissions, turn the
setting off first.