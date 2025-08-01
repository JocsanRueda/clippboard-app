import { ItemClipboard } from "@/types/item-clippboard.type";
import { Store } from "@tauri-apps/plugin-store";
import { useEffect } from "react";


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
    