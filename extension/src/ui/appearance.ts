import {
  WIDTH_MAX,
  APPEARANCE_KEY,
  DEFAULTS,
  loadAppearance,
  resolveMode,
  type Appearance,
  type FontFamily,
  TOKEN_PROPERTIES,
  type ThemeToken,
  loadCustomThemes,
  inferBase,
  CUSTOM_THEMES_KEY,
} from "../lib/appearance";
import { reRenderDiagrams } from "./mermaid";

const FONT_STACKS: Record<FontFamily, string> = {
  sans: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`,
  serif: `ui-serif, Charter, "Iowan Old Style", Georgia, serif`,
  mono: `ui-monospace, "SF Mono", Menlo, Consolas, monospace`,
};

// custom theme - v0.3.0

/**
 * Built-in themes lies in style.css and are selected by data-theme. A custom
 * theme has no stylesheet block, so it writes the twelve properties inline on
 * :root. Inline styles ovverrides the stylesheet, and this works
 */
function clearCustomTheme(root: HTMLElement): void {
  for (const property of Object.values(TOKEN_PROPERTIES)) {
    root.style.removeProperty(property);
  }
}

function applyCustomTheme(
  root: HTMLElement,
  colors: Record<ThemeToken, string>,
): void {
  for (const [token, property] of Object.entries(TOKEN_PROPERTIES)) {
    root.style.setProperty(property, colors[token as ThemeToken]);
  }
}

/**
 * Themes are selected by data-theme on <html> rather than a class, because
 * there are now six of them and `.theme-dark` no longer describes a single
 * palette. CSS reads :root[data-theme="carbon"] and so on.
 */
export async function applyAppearance(appearance: Appearance): Promise<void> {
  const root = document.documentElement;

  let base: "light" | "dark";

  if (appearance.mode === "custom") {
    const themes = await loadCustomThemes();
    const theme = themes.find((t) => t.id === appearance.customTheme);

    if (theme) {
      // No data-theme — the inline properties are the palette.
      delete root.dataset.theme;
      applyCustomTheme(root, theme.colors);
      base = inferBase(theme.colors.bg);
    } else {
      // The selected theme was deleted, or the id is stale. Fall back to a
      // built-in rather than leaving the page unstyled.
      clearCustomTheme(root);
      root.dataset.theme = DEFAULTS.lightTheme;
      base = "light";
    }
  } else {
    clearCustomTheme(root);
    const resolved = resolveMode(appearance.mode);
    root.dataset.theme =
      resolved === "dark" ? appearance.darkTheme : appearance.lightTheme;
    base = resolved;
  }

  const baseChanged = root.dataset.base !== base;
  root.dataset.base = base;

  if (baseChanged) void reRenderDiagrams();

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

  root.style.setProperty("--font-body", FONT_STACKS[appearance.font]);
  root.style.setProperty("--reader-font-size", `${appearance.fontSize}px`);
  root.style.setProperty("--reader-line-height", String(appearance.spacing));
}

export async function applyStoredAppearance(): Promise<void> {
  await applyAppearance(await loadAppearance());
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

    if (!changes[APPEARANCE_KEY] && !changes[CUSTOM_THEMES_KEY]) return;

    if (changes[APPEARANCE_KEY]) {
      const next = changes[APPEARANCE_KEY].newValue;
      void applyAppearance(
        next && typeof next === "object"
          ? { ...DEFAULTS, ...(next as Partial<Appearance>) }
          : { ...DEFAULTS },
      );
    } else {
      // Only the theme list changed; re-read appearance from storage since
      // this event carries no copy of it.
      void applyStoredAppearance();
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      void applyStoredAppearance();
    });
}
