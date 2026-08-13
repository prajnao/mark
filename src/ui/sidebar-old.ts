import type { TocItem } from "./toc";

const COLLAPSE_KEY = "sidebar-collapsed";

export function buildSidebar(items: TocItem[]): HTMLElement {
  console.log(items,"items")
  const sidebar = document.createElement("aside");
  sidebar.id = "mark-sidebar";

  const title = document.createElement("div");
  title.id = "mark-sidebar-title";
  title.textContent = document.title;
  sidebar.appendChild(title);

  const nav = document.createElement("nav");
  nav.id = "mark-toc";

  const minLevel = Math.min(...items.map((item) => item.level));

  for (const item of items) {
    if (!item.id) continue;

    const link = document.createElement("a");
    link.href = `#${item.id}`;
    link.textContent = item.text;
    link.className = "mark-toc-link";
    link.dataset.id = item.id;
    link.style.paddingLeft = `${12 + (item.level - minLevel) * 14}px`;

    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.getElementById(item.id);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${item.id}`);
    });

    nav.appendChild(link);
  }

  sidebar.appendChild(nav);
  return sidebar;
}


export function trackActiveHeading(items: TocItem[]): void {
  const links = new Map<string, HTMLElement>();
  document.querySelectorAll<HTMLElement>(".mark-toc-link").forEach((link) => {
    if (link.dataset.id) links.set(link.dataset.id, link);
  });

  const headings = items
    .map((item) => document.getElementById(item.id))
    .filter((node): node is HTMLElement => node !== null);

  let current: HTMLElement | null = null;
  let queued = false;

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

    if (!active) return;

    const link = links.get(active.id);
    if (!link || link === current) return;

    current?.classList.remove("is-active");
    link.classList.add("is-active");
    link.scrollIntoView({ block: "nearest" });
    current = link;
  }

  window.addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
}


export function buildToggle(): HTMLElement {
  const button = document.createElement("button");
  button.id = "mark-toggle";
  button.title = "Contents";
  button.textContent = "☰";

  button.addEventListener("click", () => {
    const collapsed = document.body.classList.toggle("sidebar-collapsed");
    chrome.storage.local.set({ [COLLAPSE_KEY]: collapsed });
  });

  return button;
}

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