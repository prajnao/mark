<!-- ![Mark](website/public/logo.png) -->
<p align="left">
  <img src="website/public/logo.png" alt="Mark" width="150">
</p>


[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Install-4285F4?logo=googlechrome&logoColor=white)](https://chrome.google.com/webstore)

Mark is a simple, intuitive way to read Markdown files as rich document right in your browser

Double-click a `.md` file and read it like a document, not source code.

[Install for Chrome](https://chromewebstore.google.com/detail/mark/mlakoabceocimmnfohpmpjojmgdgijbp) · [Website](https://mark.prajnaprabhu.com) · [Changelog](extension/CHANGELOG.md)

## Features

- Opens local `.md` and `.markdown` files by double-click
- Contents rail built from your headings, with click-to-jump and live position
- Light, dark, and system themes
- Typography tuned for long documents
- GitHub Flavored Markdown — tables, task lists, footnotes, strikethrough, automatic links
- Syntax highlighting with a language label and copy button
- Math with KaTeX, inline and block
- Mermaid diagrams
- SVG and safe embedded HTML
- Read-only — your file is never modified
- Local-first — nothing is uploaded, no server, no account
- Every document sanitized before it renders
- Free and open source


## After install
### 1. Allow access to local files

Chrome blocks all extension access to local files by default.

1. Go to `chrome://extensions`
2. Find Mark and click **Details**
3. Turn on **Allow access to file URLs**

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

```
extension/
  src/
    content/   content script and lifecycle
    core/      Markdown parsing and sanitizing
    popup/     extension popup
    ui/        sidebar, code blocks, diagrams, theme
    styles/    viewer stylesheet
  manifest.json
website/       marketing site
```


## License

MIT © [Prajna Prabhu](https://prajnaprabhu.com)
