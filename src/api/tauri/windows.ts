import { CLIPPBOARD_COMMANDS } from "@/constants/constant";
import { invoke } from "@tauri-apps/api/core";

// resize windows
export const resizeWindow = async (width: number, height: number) => {
  try {
    await invoke(CLIPPBOARD_COMMANDS.RESIZE_WINDOW, { width: width, height: height });
  } catch (err) {
    console.error("Error hiding app:", err);
  }
};

