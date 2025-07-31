import { ItemClipboard } from "@/types/item-clippboard.type";
import { normalizeString } from "./string";

export function addUnique(array: ItemClipboard[], text: string): ItemClipboard[] {

  const newItem: ItemClipboard = {
    text: normalizeString(text),
    type: "text",
    url: "",
  };

  if (!array.some(item => item.text === newItem.text && item.type === newItem.type)) {
    return [...array, newItem];
  }
  return array;
}