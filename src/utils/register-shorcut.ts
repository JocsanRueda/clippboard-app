import { register } from "@tauri-apps/plugin-global-shortcut";
// when using `"withGlobalTauri": true`, you may use
// const { register } = window.__TAURI__.globalShortcut;

await register("CommandOrControl+f", () => {
  console.log("Shortcut triggered");
});
