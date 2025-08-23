import { invoke } from '@tauri-apps/api/core';



// remove item
export const removeClipboardItem = async (index: number) => {
  try {
    await invoke('delete_item_command', { 
      index:index, 
      key: "history" 
    });
  } catch (err) {
    console.error("Error deleting item:", err);
  }
};
// update item
export const updateClipboardItem = async (index: number, text: string,) => {
  try {
    await invoke("update_item_command", { index:index, newValue:text ,key:"history"});
  } catch (err) {
    console.error("Error updating item:", err);
  }
};


