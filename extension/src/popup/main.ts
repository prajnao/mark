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
  TOKEN_LABELS,
  loadCustomThemes,
  saveCustomThemes,
  type Appearance,
  type ThemeMode,
  type LightTheme,
  type DarkTheme,
  type FontFamily,
  type SidebarMode,
  type CustomTheme,
  type ThemeToken,
} from "../lib/appearance";

let state: Appearance = { ...DEFAULTS };

/**
 * Cached so render() can stay synchronous. The popup is destroyed and rebuilt
 * every time it opens, so this is loaded once in main() and kept in step with
 * storage by the save path.
 */
let customThemes: CustomTheme[] = [];

/** null means the form is creating, an id means it is editing that theme. */
let editingId: string | null = null;

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

/**
 * The Appearance tab holds two views: the general controls and the custom
 * theme manager. Only one is visible at a time.
 */
function setupAppearanceViews(): void {
  function show(view: "general" | "custom"): void {
    document.querySelectorAll<HTMLElement>("[data-view]").forEach((element) => {
      element.hidden = element.dataset.view !== view;
    });
  }

  document
    .getElementById("open-custom-themes")
    ?.addEventListener("click", () => show("custom"));

  document.getElementById("back-to-general")?.addEventListener("click", () => {
    closeForm();
    show("general");
  });
}

/*
 * Type guards. Width needs none now that it is a plain number — clamp
 * keeps it inside the range, so there is nothing to validate.
 */

function isThemeMode(value: string): value is ThemeMode {
  return (
    value === "system" ||
    value === "light" ||
    value === "dark" ||
    value === "custom"
  );
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

function isSidebarMode(value: string): value is SidebarMode {
  return value === "floating" || value === "fixed";
}

/* Custom theme editor */

/**
 * Twelve theme rows, generated from TOKEN_LABELS for them to not drift
 * Each row pairs a native colour swatch with a hex text field. The text field
 * is the source of truth, the swatch writes into it.
 */
function buildThemeFields(): void {
  const container = document.getElementById("theme-fields");
  if (!container) return;

  container.replaceChildren();

  for (const [token, label] of Object.entries(TOKEN_LABELS)) {
    const row = document.createElement("div");
    row.className = "setting-row";

    const name = document.createElement("span");
    name.className = "setting-label";
    name.textContent = label;

    const group = document.createElement("div");
    group.className = "color-input";

    const swatch = document.createElement("input");
    swatch.type = "color";
    swatch.className = "color-swatch";
    swatch.dataset.token = token;
    swatch.setAttribute("aria-label", label);

    const text = document.createElement("input");
    text.type = "text";
    text.className = "text-input text-input--hex";
    text.dataset.token = token;
    text.placeholder = "#000000";
    text.spellcheck = false;

    // Only move the swatch on a complete hex; a partial value like "#1a"
    // would otherwise snap it somewhere meaningless mid-typing.
    text.addEventListener("input", () => {
      if (/^#[0-9a-f]{6}$/i.test(text.value)) swatch.value = text.value;
      text.classList.remove("is-invalid");
    });

    swatch.addEventListener("input", () => {
      text.value = swatch.value;
      text.classList.remove("is-invalid");
    });

    group.append(swatch, text);
    row.append(name, group);
    container.appendChild(row);
  }
}

function openForm(theme?: CustomTheme): void {
  const form = document.getElementById("theme-form");
  const createButton = document.getElementById("create-theme");
  const nameInput = document.getElementById("theme-name");

  if (!form || !createButton) return;
  if (!(nameInput instanceof HTMLInputElement)) return;

  editingId = theme?.id ?? null;
  nameInput.value = theme?.name ?? "";

  document
    .querySelectorAll<HTMLInputElement>("#theme-fields [data-token]")
    .forEach((input) => {
      const token = input.dataset.token as ThemeToken;
      const value = theme?.colors[token] ?? "";

      // A colour input cannot hold an empty value, it falls back to black or the placeholder set.
      input.value = input.type === "color" ? value || "#000000" : value;
      input.classList.remove("is-invalid");
    });

  form.hidden = false;
  
  createButton.hidden = true;
  nameInput.focus();
}

function deleteTheme(id: string): void {
  customThemes = customThemes.filter((theme) => theme.id !== id);
  void saveCustomThemes(customThemes);

  // Editing the theme that just disappeared would save it back on submit.
  if (editingId === id) closeForm();

  if (state.customTheme === id) {
    commit({ mode: "light", customTheme: null });
  } else {
    render();
  }
}

function closeForm(): void {
  const form = document.getElementById("theme-form");
  const createButton = document.getElementById("create-theme");
  if (!form || !createButton) return;

  editingId = null;
  form.hidden = true;
  createButton.hidden = false;
}

function setupThemeForm(): void {
  const form = document.getElementById("theme-form");
  if (!(form instanceof HTMLFormElement)) return;

  document
    .getElementById("create-theme")
    ?.addEventListener("click", () => openForm());

  document.getElementById("cancel-theme")?.addEventListener("click", closeForm);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("theme-name");
    if (!(nameInput instanceof HTMLInputElement)) return;

    const colors = {} as Record<ThemeToken, string>;
    let valid = true;

    document
      .querySelectorAll<HTMLInputElement>(
        "#theme-fields .text-input[data-token]",
      )
      .forEach((input) => {
        const token = input.dataset.token as ThemeToken;
        const value = input.value.trim();

        const ok = value !== "" && CSS.supports("color", value);
        input.classList.toggle("is-invalid", !ok);

        if (!ok) valid = false;
        colors[token] = value;
      });

    if (!valid) return;

    if (editingId) {
      customThemes = customThemes.map((theme) =>
        theme.id === editingId
          ? { ...theme, name: nameInput.value.trim(), colors }
          : theme,
      );
    } else {
      customThemes = [
        ...customThemes,
        { id: crypto.randomUUID(), name: nameInput.value.trim(), colors },
      ];
    }

    void saveCustomThemes(customThemes);
    closeForm();
    render();
  });
}

/* Rendering */
function renderCustomThemes(): void {
  const list = document.getElementById("custom-theme-list");
  const empty = document.getElementById("custom-theme-empty");
  if (!list || !empty) return;

  empty.hidden = customThemes.length > 0;
  list.replaceChildren();

  for (const theme of customThemes) {
    const row = document.createElement("div");
    row.className = "theme-row";

    const swatch = document.createElement("span");
    swatch.className = "theme-row-swatch";
    swatch.style.background = theme.colors.bg;
    swatch.style.borderColor = theme.colors.border;

    const name = document.createElement("span");

    // edit and delete option for custom theme row
    const actions = document.createElement("div");
    actions.className = "theme-row-actions";

    // edit dom action code 
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "icon-btn";
    edit.setAttribute("aria-label", `Edit ${theme.name}`);
    edit.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
    `;
   
    edit.addEventListener("click", () => openForm(theme));

  //  delete dom action code 
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-btn icon-btn--danger";
    remove.setAttribute("aria-label", `Delete ${theme.name}`);
    remove.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 6h18"/>
        <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      </svg>
    `;
    remove.addEventListener("click", () => deleteTheme(theme.id));


    actions.append(edit, remove);

    const nameSwatchGroup= document.createElement("div");
    nameSwatchGroup.className="name-swatch-group";
    nameSwatchGroup.append(swatch,name)

    row.append(nameSwatchGroup, actions);


    name.className = "theme-row-name";
    name.textContent = theme.name;

    list.appendChild(row);
  }
}

function renderCustomSwatches(): void {
  const group = document.getElementById("custom-swatches");
  if (!group) return;

  group.hidden = state.mode !== "custom";
  if (state.mode !== "custom") return;

  group.replaceChildren();

  for (const theme of customThemes) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "swatch";
    button.dataset.customTheme = theme.id;
    button.textContent = theme.name;
    button.style.setProperty("--swatch-bg", theme.colors.bg);
    button.style.setProperty("--swatch-fg", theme.colors.fg);
    button.style.setProperty("--swatch-border", theme.colors.border);
    button.classList.toggle("is-selected", theme.id === state.customTheme);

    button.addEventListener("click", () => {
      commit({ customTheme: theme.id });
    });

    group.appendChild(button);
  }
}

/**
 * Single source of truth for the UI: every change goes through here, so the
 * DOM is always redrawn from state rather than patched in place.
 */
function render(): void {
  const isCustom = state.mode === "custom";

  // resolveMode rejects "custom" by type — it has no light/dark answer. The
  // popup's own palette falls back to light in that case.
  const resolved = state.mode === "custom" ? "light" : resolveMode(state.mode);

  document.documentElement.dataset.base = resolved;

  const modeSelect = document.getElementById("theme-mode");
  if (modeSelect instanceof HTMLSelectElement) {
    modeSelect.value = state.mode;
  }

  const swatchGroup = document.getElementById("theme-swatches");
  if (swatchGroup) {
    swatchGroup.hidden = isCustom;
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

  document.querySelectorAll<HTMLElement>("[data-sidebar]").forEach((segment) => {
    const selected = segment.dataset.sidebar === state.sidebar;
    segment.classList.toggle("is-selected", selected);
    segment.setAttribute("aria-checked", String(selected));
  });

  // Disable steppers at the limits (max and min values)
  setDisabled("font-size-down", state.fontSize <= FONT_SIZE_MIN);
  setDisabled("font-size-up", state.fontSize >= FONT_SIZE_MAX);
  setDisabled("spacing-down", state.spacing <= SPACING_MIN);
  setDisabled("spacing-up", state.spacing >= SPACING_MAX);
  setDisabled("width-down", state.width <= WIDTH_MIN);
  setDisabled("width-up", state.width >= WIDTH_MAX);

  renderCustomSwatches();
  renderCustomThemes();
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

/* Wiring */

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

function setupSidebar(): void {
  document.querySelectorAll<HTMLElement>("[data-sidebar]").forEach((segment) => {
    segment.addEventListener("click", () => {
      const mode = segment.dataset.sidebar;
      if (!mode || !isSidebarMode(mode)) return;
      commit({ sidebar: mode });
    });
  });
}

async function main(): Promise<void> {
  showVersion();
  setupTabs();
  setupAppearanceViews();

  // The twelve rows must exist before openForm tries to fill them.
  buildThemeFields();

  state = await loadAppearance();
  customThemes = await loadCustomThemes();
  render();

  setupThemeMode();
  setupSwatches();
  setupFont();
  setupSteppers();
  setupReset();
  setupSidebar();
  setupThemeForm();
}

void main();

