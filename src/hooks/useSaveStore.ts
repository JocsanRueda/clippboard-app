import { ItemClipboard } from "@/types/item-clippboard.type";
import { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";



// This hook saves the dataList to the store whenever it changes.
// It should be used in components that need to persist clipboard history.
// The `storeRef` is a mutable reference to the Store instance, and `dataList` is the current clipboard data.
export function useSaveStore(
  dataList: ItemClipboard[]
) {
  // Save the dataList to the store whenever it changes

 useEffect(() => {
     const saveData = async () => {
       await invoke("save_store_command", { history:dataList,key:"history"});
     };

     saveData();
   }, [dataList]);




  }
    