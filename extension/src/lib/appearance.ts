export type ThemeMode = "system" | "light" | "dark";
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

/** Turns "system" into the concrete mode currently in effect. */
export function resolveMode(mode: ThemeMode): "light" | "dark" {
  if (mode !== "system") return mode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}