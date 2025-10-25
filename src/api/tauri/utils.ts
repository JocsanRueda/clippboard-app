import { readFile } from "@tauri-apps/plugin-fs";
import { BaseDirectory } from "@tauri-apps/plugin-fs";

export async function getImage(fileName: string) {

  console.log(BaseDirectory);
  const bytes = await readFile(`images/${fileName}`, {
    baseDir: BaseDirectory.AppLocalData,
  });

  // eslint-disable-next-line no-undef
  const blob = new Blob([new Uint8Array(bytes)], { type: "image/png" });

  console.log(blob);
  // eslint-disable-next-line no-undef
  const url = URL.createObjectURL(blob);

  console.log(url);
  return url;
}
