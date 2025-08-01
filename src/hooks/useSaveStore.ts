import { ItemClipboard } from "@/types/item-clippboard.type";
import { Store } from "@tauri-apps/plugin-store";
import { useEffect } from "react";



// This hook saves the dataList to the store whenever it changes.
// It should be used in components that need to persist clipboard history.
// The `storeRef` is a mutable reference to the Store instance, and `dataList` is the current clipboard data.
export function useSaveStore(
  storeRef: React.MutableRefObject<Store | null>,
  dataList: ItemClipboard[]
) {
  // Save the dataList to the store whenever it changes

 useEffect(() => {
     const saveData = async () => {
       if (storeRef.current) {
       await storeRef.current.set("history", dataList);
       await storeRef.current.save();
     }
    }

     saveData();
   }, [dataList]);

  }
    