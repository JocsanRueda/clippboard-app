import { ItemActionMenu } from "@/types/item-action-menu.type";
import { ItemClipboard } from "@/types/item-clippboard.type";
import { CLIPPBOARD_KEY } from "@/constants/constant";
import { Store } from "@tauri-apps/plugin-store";
import React, { useEffect } from "react";
// This hook initializes the store and loads existing data into the state.
// It sets up the store reference and populates the data list and toggle actions.
// It should be used in components that need to access or modify the clipboard history.

export const useInitStore = (
  storeRef: React.MutableRefObject<Store | null>,
  setDataList: React.Dispatch<React.SetStateAction<ItemClipboard[]>>,
  setToggleActions: React.Dispatch<React.SetStateAction<ItemActionMenu[]>>
) => {
  useEffect(() => {
    const initStore = async () => {
      storeRef.current = await Store.load(CLIPPBOARD_KEY.FILE);

      const storedData = await storeRef.current.get<ItemClipboard[]>(CLIPPBOARD_KEY.HISTORY);
      if (storedData) {
        setDataList(storedData);

        const newToggleActions= storedData.map((item)=> {
          return { showMenu: false, activeEdit: false, fixed: item.fixed || false};
        });

        setToggleActions(newToggleActions);
      }
    };

    initStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
