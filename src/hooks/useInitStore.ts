import { ItemActionMenu } from "@/types/item-action-menu.type";
import { ItemClipboard } from "@/types/item-clipboard.type";
import { getHistoryItems } from "@/utils/store";
import React, { useEffect } from "react";
// This hook initializes the store and loads existing data into the state.
// It sets up the store reference and populates the data list and toggle actions.
// It should be used in components that need to access or modify the clipboard history.

export const useInitStore = (
  dataList: ItemClipboard[],
  setDataList: React.Dispatch<React.SetStateAction<ItemClipboard[]>>,
  setToggleActions: React.Dispatch<React.SetStateAction<ItemActionMenu[]>>
) => {
  useEffect(() => {
    const initStore = async () => {

      const storedData = await getHistoryItems();
      if (storedData) {
        setDataList(storedData);

        const newToggleActions= storedData.map((item)=> {
          return { showMenu: false, activeEdit: false, fixed: item.fixed || false};
        });

        setToggleActions(newToggleActions);
      }
    };

    if(dataList.length===0) initStore();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
