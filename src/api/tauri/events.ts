import { CLIPBOARD_EVENT } from "@/constants/constant";
import { invoke } from "@tauri-apps/api/core";

// hidde App
export const hideApp = async () => {
  try {
    await invoke(CLIPBOARD_EVENT.HIDDEN);
  } catch (err) {
    console.error("Error hiding app:", err);
  }
};

