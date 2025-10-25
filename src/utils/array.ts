import { ItemClipboard } from "@/types/item-clipboard.type";
import { newItemPayload } from "@/types/new-item-payload";
import { normalizeString } from "./string";

export function addUnique(array: ItemClipboard[], text: string): ItemClipboard[] {

  const newItem: ItemClipboard = {
    value: normalizeString(text),
    type: "text",
    path: "",
    fixed: false
  };

  if (!array.some(item => item.value === newItem.value && item.type === newItem.type )) {
    return [...array, newItem];
  }

  return array;
}

export function add(array: ItemClipboard[], item: newItemPayload): ItemClipboard[] {

  const newItemClipboard: ItemClipboard = {
    value: normalizeString(item.value),
    type: item.type,
    path: item.path,
    fixed: false
  };

  return [...array, newItemClipboard];
}
