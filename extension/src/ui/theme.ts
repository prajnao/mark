export type Theme = "system" | "light" | "dark";

export const THEME_KEY = "theme";

export function isTheme(value: unknown): value is Theme {
    return value === "system" || value === "light" || value === "dark";
  }
  
  export async function saveTheme(theme: Theme): Promise<void> {
    try {
      await chrome.storage.local.set({ [THEME_KEY]: theme });
    } catch {
        
    }
  }

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove("theme-light", "theme-dark");

  if (theme === "light") root.classList.add("theme-light");
  if (theme === "dark") root.classList.add("theme-dark");
}

export async function loadTheme(): Promise<Theme> {
  try {
    const stored = await chrome.storage.local.get(THEME_KEY);
    const value = stored[THEME_KEY];
    return isTheme(value) ? value : "system";
  } catch {
    return "system";
  }
}


export async function applyStoredTheme(): Promise<void> {
  applyTheme(await loadTheme());
}


export function watchThemeChanges(): void {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;

    const change = changes[THEME_KEY];
    if (!change) return;

    if (isTheme(change.newValue)) applyTheme(change.newValue);
  });
}


