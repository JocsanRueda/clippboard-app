import { useEffect } from "react";
import { Store } from "@tauri-apps/plugin-store";
import { CLIPPBOARD_HISTORY_KEY, CLIPPBOARD_STORE_FILE } from "@/utils/constant";
import { defaultItemClipboard } from "@/default/values";
import { ItemClipboard } from "@/types/item-clippboard.type";

export const useInitStore = (
  storeRef: React.MutableRefObject<Store | null>,
  setDataList: React.Dispatch<React.SetStateAction<ItemClipboard[]>>,
  setToggleActions: React.Dispatch<React.SetStateAction<ItemActionMenu[]>>
) => {
  useEffect(() => {
    const initStore = async () => {
      storeRef.current = await Store.load(CLIPPBOARD_STORE_FILE);

      const storedData = await storeRef.current.get<ItemClipboard[]>(CLIPPBOARD_HISTORY_KEY);
      if (storedData) {
        setDataList(storedData);
        setToggleActions(Array(storedData.length).fill(defaultItemClipboard));
      }
    };

    initStore();
    
  }, []);
};