import { applyTheme, loadTheme, saveTheme, isTheme } from "../ui/theme";

function showVersion(): void {
  const element = document.getElementById("version");
  if (!element) return;

  element.textContent = `v${chrome.runtime.getManifest().version}`;
}


async function setupTheme(): Promise<void> {
  const select = document.getElementById("theme");
  if (!(select instanceof HTMLSelectElement)) return;

  const theme = await loadTheme();

  // popup is its own separate document, so it needs the class too.
  applyTheme(theme);
  select.value = theme;

  select.addEventListener("change", () => {
    if (!isTheme(select.value)) return;

    applyTheme(select.value);
    void saveTheme(select.value);
  });
}

async function main(): Promise<void> {
  showVersion();
  await setupTheme();
}

void main();