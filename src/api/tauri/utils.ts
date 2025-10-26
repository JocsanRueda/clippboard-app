import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/core";

export async function getImageUrl(fileName: string) {
  const dir = await appLocalDataDir();
  const fullPath = await join(dir, "/images/thumbs", "thumb_" + fileName+".bmp");
  return convertFileSrc(fullPath);
}
