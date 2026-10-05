export type ThemeMode = "system" | "light" | "dark" | "custom";
export type LightTheme = "white" | "paper" | "dawn";
export type DarkTheme = "carbon" | "ink" | "onyx";
export type FontFamily = "sans" | "serif" | "mono";
export type SidebarMode = "floating" | "fixed";

export interface Appearance {
  mode: ThemeMode;
//  Decision: 
//  the reason for having lightTheme and darkTheme and not just theme is because 
//  people have this sytem theme set according to the time, and say they have dawn on light theme 
//  and ink on dark theme My sytem needs to carry these defaults, otherwise one of it is overwritten each time
  lightTheme: LightTheme;
  darkTheme: DarkTheme;
  customTheme:string|null;
  font: FontFamily;
  fontSize: number;
  spacing: number;
  width: number;
  sidebar:SidebarMode;
}

export const APPEARANCE_KEY = "appearance";

export const DEFAULTS: Appearance = {
  mode: "system",
  lightTheme: "white",
  darkTheme: "carbon",
  customTheme:null,
  font: "sans",
  fontSize: 16,
  spacing: 1.5,
  width: 70,
  sidebar:"floating"
};

export const FONT_SIZE_MIN = 13;
export const FONT_SIZE_MAX = 22;
export const FONT_SIZE_STEP = 1;

export const SPACING_MIN = 1.2;
export const SPACING_MAX = 2.0;
export const SPACING_STEP = 0.1;

export const WIDTH_MIN = 60;
export const WIDTH_MAX = 130;
export const WIDTH_STEP = 5;


// custom theme - v0.3.0

/**
 * A custom theme is made up of these 12 tokens, these are the primary tokens using which the 
 * entire styling is derieved in styles/style.css. The base(light or dark) is not set by any token, 
 * its determined by background color set.

 */
export type ThemeToken=
| "bg"
| "fg"
| "fgMuted"
| "border"
| "link"
| "brand"
| "brandSubtle"
| "codeBg"
| "codeFg"
| "surface"
| "surfaceHover"
| "selection";

export interface CustomTheme{
  id:string;
  name:string;
  colors:Record<ThemeToken,string>
};

export const CUSTOM_THEMES_KEY = "customThemes";

/** Maps a token to the CSS custom property it sets. */
export const TOKEN_PROPERTIES: Record<ThemeToken, string> = {
  bg: "--bg",
  fg: "--fg",
  fgMuted: "--fg-muted",
  border: "--border",
  link: "--link",
  brand: "--brand",
  brandSubtle: "--brand-subtle",
  codeBg: "--code-bg",
  codeFg: "--code-fg",
  surface: "--surface",
  surfaceHover: "--surface-hover",
  selection: "--selection",
};

/** Form labels, kept short for a 330px popup. */
export const TOKEN_LABELS: Record<ThemeToken, string> = {
  bg: "Background",
  fg: "Text",
  fgMuted: "Muted text",
  border: "Border",
  link: "Link",
  brand: "Accent",
  brandSubtle: "Accent surface",
  codeBg: "Code background",
  codeFg: "Code text",
  surface: "Surface",
  surfaceHover: "Hover",
  selection: "Selection",
};

export async function loadCustomThemes(): Promise<CustomTheme[]> {
  try {
    const stored = await chrome.storage.local.get(CUSTOM_THEMES_KEY);
    const value = stored[CUSTOM_THEMES_KEY];
    return Array.isArray(value) ? (value as CustomTheme[]) : [];
  } catch {
    return [];
  }
}

export async function saveCustomThemes(themes: CustomTheme[]): Promise<void> {
  try {
    await chrome.storage.local.set({ [CUSTOM_THEMES_KEY]: themes });
  } catch {
    // Storage failures are not worth interrupting the user over.
  }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Merges stored values over the defaults rather than trusting what comes back.
 * Storage can hold data written by an older version that didn't have half
 * these fields, so a missing key has to fall back rather than land undefined
 * in the CSS.
 */
export async function loadAppearance(): Promise<Appearance> {
  try {
    const stored = await chrome.storage.local.get(APPEARANCE_KEY);
    const value = stored[APPEARANCE_KEY];

    if (!value || typeof value !== "object") return { ...DEFAULTS };
    return { ...DEFAULTS, ...(value as Partial<Appearance>) };
  } catch {
    return { ...DEFAULTS };
  }
}

export async function saveAppearance(value: Appearance): Promise<void> {
  try {
    await chrome.storage.local.set({ [APPEARANCE_KEY]: value });
  } catch {
    // Storage failures 
  }
}


/**
 * Turns "system" into the concrete mode currently in effect.
 *
 * Custom is deliberately excluded: it is not a light/dark choice, so there
 * is nothing to resolve. Its base comes from the background colour instead
 * (see inferBase). Excluding it from the type means every call site has to
 * handle custom before getting here, rather than silently passing it through.
 */
export function resolveMode(
  mode: Exclude<ThemeMode, "custom">,
): "light" | "dark" {
  if (mode !== "system") return mode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}


/**
 * Decides whether a custom theme is light or dark from its background alone.
 * this is derieved rather than predefined
 * Uses the WCAG relative luminance formula. The 0.5 split is the standard
 * one; the built-in themes land nowhere near it (Dawn ~0.94, Carbon ~0.01).
 */
export function inferBase(hex: string): "light" | "dark" {
  const normalised = hex.replace("#", "");

  // Expand #abc to #aabbcc.
  const full =
    normalised.length === 3
      ? normalised
          .split("")
          .map((c) => c + c)
          .join("")
      : normalised;

  const channels = [0, 2, 4].map((i) => {
    const value = parseInt(full.slice(i, i + 2), 16) / 255;
    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  const [r, g, b] = channels;
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance < 0.5 ? "dark" : "light";
}