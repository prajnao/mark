import type { TocItem } from "./toc";

const COLLAPSE_KEY = "sidebar-collapsed";

function scrollToHeading(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function buildSidebar(items: TocItem[]): HTMLElement {
  const sidebar = document.createElement("aside");
  sidebar.id = "mark-sidebar";

  const rail = document.createElement("div");
  rail.id = "mark-toc-rail";

  const panel = document.createElement("div");
  panel.id = "mark-toc-panel";

  const title = document.createElement("div");
  title.id = "mark-sidebar-title";
  title.textContent = "Contents";
  panel.appendChild(title);

  const nav = document.createElement("nav");
  nav.id = "mark-toc";

  const minLevel = Math.min(...items.map((item) => item.level));

  for (const item of items) {
    if (!item.id) continue;

    const depth = String(item.level - minLevel);

    const bar = document.createElement("button");
    bar.className = "mark-toc-bar";
    bar.dataset.id = item.id;
    bar.title = item.text;
    bar.setAttribute("aria-label", item.text);
    bar.style.setProperty("--depth", depth);
    bar.addEventListener("click", () => scrollToHeading(item.id));
    rail.appendChild(bar);

    const link = document.createElement("a");
    link.className = "mark-toc-link";
    link.href = `#${item.id}`;
    link.textContent = item.text;
    link.title = item.text;
    link.dataset.id = item.id;
    link.style.setProperty("--depth", depth);
    link.style.setProperty("padding-left", `calc(10px + var(--depth) * 8px)`);
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToHeading(item.id);
    });
    nav.appendChild(link);
  }

  panel.appendChild(nav);
  sidebar.appendChild(rail);
  sidebar.appendChild(panel);

    rail.addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("sidebar-collapsed");
    void chrome.storage.local.set({ [COLLAPSE_KEY]: collapsed });
  });

  return sidebar;
}

interface TocPair {
  link: HTMLElement | undefined;
  bar: HTMLElement | undefined;
}

export function trackActiveHeading(items: TocItem[]): void {
  const pairs = new Map<string, TocPair>();

  for (const item of items) {
    if (!item.id) continue;
    pairs.set(item.id, {
      link: document.querySelector<HTMLElement>(
        `.mark-toc-link[data-id="${CSS.escape(item.id)}"]`
      ) ?? undefined,
      bar: document.querySelector<HTMLElement>(
        `.mark-toc-bar[data-id="${CSS.escape(item.id)}"]`
      ) ?? undefined,
    });
  }

  const headings = items
    .map((item) => document.getElementById(item.id))
    .filter((node): node is HTMLElement => node !== null);

  let currentId: string | null = null;
  let queued = false;

  function setActive(id: string, on: boolean): void {
    const pair = pairs.get(id);
    if (!pair) return;
    pair.link?.classList.toggle("is-active", on);
    pair.bar?.classList.toggle("is-active", on);
  }

  function update(): void {
    queued = false;

    const line = window.innerHeight * 0.25;
    let active = headings[0];

    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= line) {
        active = heading;
      } else {
        break;
      }
    }

    if (!active || active.id === currentId) return;

    if (currentId) setActive(currentId, false);
    setActive(active.id, true);
    currentId = active.id;

    pairs.get(active.id)?.link?.scrollIntoView({ block: "nearest" });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true }
  );

  update();
}

// export function buildToggle(): HTMLElement {
//   const button = document.createElement("button");
//   button.id = "mark-toggle";
//   button.title = "Contents";
//   button.textContent = "☰";

//   button.addEventListener("click", () => {
//     const collapsed = document.body.classList.toggle("sidebar-collapsed");
//     void chrome.storage.local.set({ [COLLAPSE_KEY]: collapsed });
//   });

//   return button;
// }

export async function applyStoredCollapse(): Promise<void> {
  try {
    const stored = await chrome.storage.local.get(COLLAPSE_KEY);
    if (stored[COLLAPSE_KEY]) {
      document.body.classList.add("sidebar-collapsed");
    }
  } catch {
    // The default state stays.
  }
}