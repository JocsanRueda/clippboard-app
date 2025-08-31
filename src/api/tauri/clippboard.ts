import { invoke } from "@tauri-apps/api/core";
import { CLIPPBOARD_HISTORY_KEY } from "@/utils/constant";

// remove item
export const removeClipboardItem = async (index: number) => {
  try {
    await invoke("delete_item_command", {
      index:index,
      key: "history"
    });
  } catch (err) {
    console.error("Error deleting item:", err);
  }
};
// update item
export const updateClipboardItem = async (index: number, text: string, property="text") => {
  try {
    await invoke("update_item_command", { index:index, newValue:text ,key:CLIPPBOARD_HISTORY_KEY, propertyName:property});
  } catch (err) {
    console.error("Error updating item:", err);
  }
};

// delete all items
export const deleteAllClipboardItems = async () => {
  try {
    await invoke("delete_all_items_command", { key: CLIPPBOARD_HISTORY_KEY });
  } catch (err) {
    console.error("Error deleting all items:", err);
  }
};

// update item
export const fixedClipboardItem = async (index: number, state: boolean) => {
  try {
    await invoke("fixed_item_command", { index:index, newValue:state ,key:CLIPPBOARD_HISTORY_KEY});
  } catch (err) {
    console.error("Error updating item:", err);
  }
};
