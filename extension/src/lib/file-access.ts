export async function hasFileAccess(): Promise<boolean> {
    try {
      return await chrome.extension.isAllowedFileSchemeAccess();
    } catch {
      return false;
    }
  }
  
  export function openExtensionSettings(): void {
    void chrome.tabs.create({ url: `chrome://extensions/?id=${chrome.runtime.id}` });
  }