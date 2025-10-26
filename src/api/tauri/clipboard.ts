import { invoke } from "@tauri-apps/api/core";

// remove item
export const removeClipboardItem = async (index: number) => {
  try {
    await invoke("delete_item_command", {
      index:index,
    });
  } catch (err) {
    console.error("Error deleting item:", err);
  }
};
// update item
export const updateClipboardItem = async (index: number, text: string, property="text") => {
  try {
    await invoke("update_item_command", { index:index, newValue:text , propertyName:property});
  } catch (err) {
    console.error("Error updating item:", err);
  }
};

// delete all items
export const deleteAllClipboardItems = async () => {
  try {
    await invoke("delete_all_items_command");
  } catch (err) {
    console.error("Error deleting all items:", err);
  }
};

// update item
export const fixedClipboardItem = async (index: number, state: boolean) => {
  try {
    await invoke("fixed_item_command", { index:index, newValue:state });
  } catch (err) {
    console.error("Error updating item:", err);
  }
};

// write image
export const writeClipboardImage = async (fileName: string) => {
  try {
    await invoke("write_image_command", { fileName: fileName });
  } catch (err) {
    console.error("Error writing image:", err);
  }
};
