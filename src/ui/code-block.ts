// const COPY_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const COPY_ICON=`  <svg width="15" height="15" fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                />
              </svg>`

const DONE_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function enhanceCodeBlocks(root: HTMLElement): void {
  const blocks = root.querySelectorAll<HTMLPreElement>("pre");

  blocks.forEach((pre) => {
    const code = pre.querySelector("code");
    if (!code) return;

    const wrap = document.createElement("div");
    wrap.className = "mark-code";

    const header = document.createElement("div");
    header.className = "mark-code-header";

    const label = document.createElement("span");
    label.className = "mark-code-lang";
    label.textContent = pre.dataset.lang ?? "text";

    const button = document.createElement("button");
    button.className = "mark-code-copy";
    button.type = "button";
    button.title = "Copy";
    button.setAttribute("aria-label", "Copy code");
    button.innerHTML = COPY_ICON;

    let timer: number | undefined;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent ?? "");
        button.innerHTML = DONE_ICON;
        button.classList.add("is-done");
        button.title = "Copied";
      } catch {
        button.title = "Copy failed";
        return;
      }

      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        button.innerHTML = COPY_ICON;
        button.classList.remove("is-done");
        button.title = "Copy";
      }, 1600);
    });

    header.appendChild(label);
    header.appendChild(button);

    pre.replaceWith(wrap);
    wrap.appendChild(header);
    wrap.appendChild(pre);
  });
}