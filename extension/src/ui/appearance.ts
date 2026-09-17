import {
  WIDTH_MAX,
    APPEARANCE_KEY,
    DEFAULTS,
    loadAppearance,
    resolveMode,
    type Appearance,
    type FontFamily,
  } from "../lib/appearance";
  
  const FONT_STACKS: Record<FontFamily, string> = {
    sans: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`,
    serif: `ui-serif, Charter, "Iowan Old Style", Georgia, serif`,
    mono: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`,
  };
  
  /**
   * Themes are selected by data-theme on <html> rather than a class, because
   * there are now six of them and `.theme-dark` no longer describes a single
   * palette. CSS reads :root[data-theme="carbon"] and so on.
   */
  export function applyAppearance(appearance: Appearance): void {
    const root = document.documentElement;
    const resolved = resolveMode(appearance.mode);
  
    root.dataset.theme =
    resolved === "dark" ? appearance.darkTheme : appearance.lightTheme;
    root.dataset.base = resolved;

  if (appearance.width >= WIDTH_MAX) {
    root.dataset.width = "full";
  } else {
    delete root.dataset.width;
    root.style.setProperty("--measure", `${appearance.width}ch`);
  }

  if (root.dataset.sidebar !== appearance.sidebar) {
    // Mode switches are a layout jump, not a state change the user is
    // watching. Transitions here animate from the old mode's geometry,
    // which reads as a glitch — suppress them for one frame.
    root.classList.add("no-transition");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("no-transition"));
    });
  }

  root.dataset.sidebar = appearance.sidebar;

  root.dataset.sidebar=appearance.sidebar;

    root.style.setProperty("--font-body", FONT_STACKS[appearance.font]);
    root.style.setProperty("--reader-font-size", `${appearance.fontSize}px`);
    root.style.setProperty("--reader-line-height", String(appearance.spacing));
  }
  
  export async function applyStoredAppearance(): Promise<void> {
    applyAppearance(await loadAppearance());
  }
  
  /**
   * Two things can change the rendered theme:
   *
   *  - the user editing settings in the popup, which lands in storage
   *  - the OS flipping light/dark, which only matters on mode "system"
   *
   * Both re-read storage rather than patching, so there's one code path.
   */
  export function watchAppearanceChanges(): void {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "local") return;
      if (!changes[APPEARANCE_KEY]) return;
  
      const next = changes[APPEARANCE_KEY].newValue;
      applyAppearance(
        next && typeof next === "object"
          ? { ...DEFAULTS, ...(next as Partial<Appearance>) }
          : { ...DEFAULTS },
      );
    });
  
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        void applyStoredAppearance();
      });
  }