import {
  loadAppearance,
  saveAppearance,
  resolveMode,
  clamp,
  round1,
  DEFAULTS,
  FONT_SIZE_MIN,
  FONT_SIZE_MAX,
  FONT_SIZE_STEP,
  SPACING_MIN,
  SPACING_MAX,
  SPACING_STEP,
  WIDTH_MIN,
  WIDTH_MAX,
  WIDTH_STEP,
  type Appearance,
  type ThemeMode,
  type LightTheme,
  type DarkTheme,
  type FontFamily,
} from "../lib/appearance";

let state: Appearance = { ...DEFAULTS };

function showVersion(): void {
  const element = document.getElementById("version");
  if (!element) return;

  element.textContent = `v${chrome.runtime.getManifest().version}`;
}

function setupTabs(): void {
  const tabs = document.querySelectorAll<HTMLElement>("[data-tab]");
  const panels = document.querySelectorAll<HTMLElement>("[data-panel]");

  function show(name: string): void {
    tabs.forEach((tab) => {
      const active = tab.dataset.tab === name;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== name;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.dataset.tab) show(tab.dataset.tab);
    });
  });
}

/*
 * Type guards. Width needs none now that it is a plain number — clamp
 * keeps it inside the range, so there is nothing to validate.
 */

function isThemeMode(value: string): value is ThemeMode {
  return value === "system" || value === "light" || value === "dark";
}

function isFontFamily(value: string): value is FontFamily {
  return value === "sans" || value === "serif" || value === "mono";
}

function isLightTheme(value: string): value is LightTheme {
  return value === "white" || value === "paper" || value === "dawn";
}

function isDarkTheme(value: string): value is DarkTheme {
  return value === "carbon" || value === "ink" || value === "onyx";
}

/**
 * Single source of truth for the UI: every change goes through here, so the
 * DOM is always redrawn from state rather than patched in place.
 */
function render(): void {
  const resolved = resolveMode(state.mode);

  document.documentElement.dataset.base = resolved;

  const modeSelect = document.getElementById("theme-mode");
  if (modeSelect instanceof HTMLSelectElement) {
    modeSelect.value = state.mode;
  }

  const swatchGroup = document.getElementById("theme-swatches");
  if (swatchGroup) {
    // CSS hides the group that doesn't match; JS only sets the attribute.
    swatchGroup.dataset.mode = resolved;
  }

  const selectedTheme =
    resolved === "dark" ? state.darkTheme : state.lightTheme;

  document.querySelectorAll<HTMLElement>("[data-theme]").forEach((swatch) => {
    const selected = swatch.dataset.theme === selectedTheme;
    swatch.classList.toggle("is-selected", selected);
    swatch.setAttribute("aria-checked", String(selected));
  });

  const fontSelect = document.getElementById("font-family");
  if (fontSelect instanceof HTMLSelectElement) {
    fontSelect.value = state.font;
  }

  // Disable steppers at the limits (max and min values)
  setDisabled("font-size-down", state.fontSize <= FONT_SIZE_MIN);
  setDisabled("font-size-up", state.fontSize >= FONT_SIZE_MAX);
  setDisabled("spacing-down", state.spacing <= SPACING_MIN);
  setDisabled("spacing-up", state.spacing >= SPACING_MAX);
  setDisabled("width-down", state.width <= WIDTH_MIN);
  setDisabled("width-up", state.width >= WIDTH_MAX);
}

function setDisabled(id: string, disabled: boolean): void {
  const element = document.getElementById(id);
  if (element instanceof HTMLButtonElement) element.disabled = disabled;
}

function commit(patch: Partial<Appearance>): void {
  state = { ...state, ...patch };
  render();
  void saveAppearance(state);
}

function setupThemeMode(): void {
  const select = document.getElementById("theme-mode");
  if (!(select instanceof HTMLSelectElement)) return;

  select.addEventListener("change", () => {
    if (!isThemeMode(select.value)) return;
    commit({ mode: select.value });
  });
}

function setupSwatches(): void {
  document.querySelectorAll<HTMLElement>("[data-theme]").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      const theme = swatch.dataset.theme;
      const group = swatch.dataset.group;
      if (!theme) return;

      // Which field to write depends on the swatch's own group, not the
      // current mode — they're always the same here, but keying off the
      // element keeps it correct if the groups are ever both visible.
      if (group === "dark") {
        if (isDarkTheme(theme)) commit({ darkTheme: theme });
      } else {
        if (isLightTheme(theme)) commit({ lightTheme: theme });
      }
    });
  });
}

function setupFont(): void {
  const select = document.getElementById("font-family");
  if (!(select instanceof HTMLSelectElement)) return;

  select.addEventListener("change", () => {
    if (!isFontFamily(select.value)) return;
    commit({ font: select.value });
  });
}

function setupSteppers(): void {
  function step(
    id: string,
    delta: number,
    key: "fontSize" | "spacing" | "width",
  ): void {
    document.getElementById(id)?.addEventListener("click", () => {
      if (key === "fontSize") {
        commit({
          fontSize: clamp(state.fontSize + delta, FONT_SIZE_MIN, FONT_SIZE_MAX),
        });
      } else if (key === "spacing") {
        // round1 because 1.5 + 0.1 is 1.6000000000000001 in float maths.
        commit({
          spacing: round1(
            clamp(state.spacing + delta, SPACING_MIN, SPACING_MAX),
          ),
        });
      } else {
        commit({
          width: clamp(state.width + delta, WIDTH_MIN, WIDTH_MAX),
        });
      }
    });
  }

  step("font-size-down", -FONT_SIZE_STEP, "fontSize");
  step("font-size-up", FONT_SIZE_STEP, "fontSize");
  step("spacing-down", -SPACING_STEP, "spacing");
  step("spacing-up", SPACING_STEP, "spacing");
  step("width-down", -WIDTH_STEP, "width");
  step("width-up", WIDTH_STEP, "width");
}

function setupReset(): void {
  document.getElementById("reset-appearance")?.addEventListener("click", () => {
    commit({ ...DEFAULTS });
  });
}

async function main(): Promise<void> {
  showVersion();
  setupTabs();

  state = await loadAppearance();
  render();

  setupThemeMode();
  setupSwatches();
  setupFont();
  setupSteppers();
  setupReset();
}

void main();