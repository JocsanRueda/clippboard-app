import { ItemActionMenu } from "@/types/item-action-menu.type";
import { getHistoryItems } from "@/utils/store";
// This hook initializes the store and loads existing data into the state.
// It sets up the store reference and populates the data list and toggle actions.
// It should be used in components that need to access or modify the clipboard history.

export const  initStore =async (
) => {

  const storedData = await getHistoryItems();
  if (storedData) {

    const newToggleActions : ItemActionMenu[] = storedData.map((item)=> {
      return { showMenu: false, activeEdit: false, fixed: item.fixed || false};
    });

    return{ dataList: storedData || [], toggleActions: newToggleActions || []};
  }

  return {dataList:null, toggleActions:null};

};

