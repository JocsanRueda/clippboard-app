import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";

export async function getImageUrl(fileName: string) {
  const dir = await appLocalDataDir();
  const fullPath = await join(dir, "/images/thumbs", "thumb_" + fileName+".bmp");
  return convertFileSrc(fullPath);
}

