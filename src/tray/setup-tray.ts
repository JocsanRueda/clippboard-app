import { TrayIcon } from "@tauri-apps/api/tray";
import { defaultWindowIcon } from "@tauri-apps/api/app";

export async function setupTray() {

  const icon = await defaultWindowIcon();

  if (icon !== null && icon !== undefined) {
    const options = { icon };
    await TrayIcon.new(options);
  } else {
    // Handle the case where the icon is null or undefined
    // For example, you could use a fallback icon or log an error
    console.error("Tray icon could not be loaded.");
  }
}

