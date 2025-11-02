import { deleteAllClipboardItems, fixedClipboardItem, removeClipboardItem, updateClipboardItem, writeClipboardImage } from "@/api/tauri/clipboard";
import { orderItemsOptions } from "@/constants/sytem-options";
import { useClipboardContext } from "@/context/Clipboard-Contex";
import { useSystemSettingsContext } from "@/context/System-Settings-Context";
import { defaultItemClipboard } from "@/default/values";
import { useClipboardWatcher } from "@/hooks/useClipboardWatcher";
import { ItemActionMenu } from "@/types/item-action-menu.type";
import { ItemClipboard } from "@/types/item-clipboard.type";
import { newItemPayload } from "@/types/new-item-payload";
import { add } from "@/utils/array";
import { clear, writeText } from "@tauri-apps/plugin-clipboard-manager";
import { useCallback, useMemo, useRef, useState } from "react";
import ContentCard from "./Content-Card";
import TopBar from "./TopBar";

import { NoResult } from "./Not-Result";
import { COPY_COLDOWN_TIME } from "@/constants/constant";

export const History = () => {

  const {dataList,setDataList,toggleActions,setToggleActions} = useClipboardContext();

  const {settings} = useSystemSettingsContext();

  const [filter, setFilter] = useState<string>("");

  const copyCoolDownRef=useRef<Record<string,number>>({});

  // Save the dataList to the store whenever it changes
  useClipboardWatcher((newText) => {
    updateClipboardDataList(newText);

  });

  // Function to update the clipboard data list with new text
  const updateClipboardDataList = (newItem: newItemPayload) => {

    const newDataList = add(dataList, newItem);

    // Check if the new data list is different from the current one
    if (newDataList.length !== dataList.length) {
      setDataList(newDataList);
      const newToggleActions = [...toggleActions, defaultItemClipboard]  ;
      setToggleActions(newToggleActions);

    }
  };

  //data list content originall data

  const handleToggleMenu = (index: number) => {
    const newToggleActions = Array((dataList.length)).fill(defaultItemClipboard);
    newToggleActions[index] = { showMenu: !toggleActions[index].showMenu, activeEdit: false };
    setToggleActions(newToggleActions);
  };

  //save new text after edit
  const handleSave = async (index: number, newText: string) => {

    const length = dataList.length-1;
    updateDataList(index, { value: newText });
    updateToggleActions(index, { showMenu: true, activeEdit: false });

    // Update the clipboard item
    await updateClipboardItem(index,newText);

    if (index === length) {
      // write the new text to the clipboard
      await writeText(newText);
    }
  };

  //toggle edit mode
  const handleEdit = (index: number) => {
    updateToggleActions(index, { activeEdit: !toggleActions[index].activeEdit });
  };

  //delete item from data list
  const handleDelete = async (index: number) => {

    const lenght = dataList.length-1;

    const newDataList = (dataList ?? []).filter((_, i) => i !== index);
    const newToggleActions = (toggleActions ?? []).filter((_, i) => i !== index);
    setToggleActions(newToggleActions);
    setDataList(newDataList);

    // If the index is the last one, clear the clipboard
    if (index===lenght) {

      await clear();
    }

    // Remove the item from the store
    await removeClipboardItem(index);

  };

  //toggle fixed state
  const handleFixed = async (index: number) => {
    updateToggleActions(index, { fixed: !toggleActions[index].fixed });

    updateDataList(index, { fixed: !dataList[index].fixed });

    await fixedClipboardItem(index,(!toggleActions[index].fixed));
  };

  // Update toggleActions state for a specific index
  const updateToggleActions = (index: number, updates: Partial<ItemActionMenu>) => {
    const newToggleActions = [...toggleActions];
    newToggleActions[index] = { ...newToggleActions[index], ...updates };
    setToggleActions(newToggleActions);
  };

  // Update dataList state for a specific index

  const updateDataList = (index: number, updates: Partial<ItemClipboard>) => {
    const newDataList = [...(dataList ?? [])];
    newDataList[index] = { ...newDataList[index], ...updates };
    setDataList(newDataList);

  };

  const deleteAllItem=async()=>{

    setDataList(dataList.filter((item) => item.fixed));
    setToggleActions(toggleActions.filter((action) => action.fixed));
    await clear();
    await deleteAllClipboardItems();

  };

  //filter and order data list
  const finalData = useMemo(() => {
    const list = dataList ?? [];
    const q = (filter || "").toLowerCase().trim();

    // Filter once
    let res = q ? list.filter(item => item.value.toLowerCase().startsWith(q)) : list;

    // Order (don't mutate original)
    if (settings.order_items !== orderItemsOptions.items[0].value) {
      res = res.slice().reverse();

    }

    return res;
  }, [dataList, filter, settings.order_items]);

  const calcIndex = useCallback((index: number) => {
    if (settings.order_items === orderItemsOptions.items[0].value) {
      return index;
    }

    return finalData.length - 1 - index;

  }, [settings.order_items, finalData.length]);

  const handleMenuClick = (index: number) => () => handleToggleMenu(index);
  const handleDeleteClick = (index: number) => () => handleDelete(index);
  const handleEditClick = (index: number) => () => handleEdit(index);
  const handleSaveClick = (index: number) => (newText: string) => handleSave(index, newText);
  const handleFixedClick = (index: number) => () => handleFixed(index);

  const handleCopyClick = (value: string,type:string) => async () => {

    const key = `${type}-${value}`;
    const now = Date.now();
    const lastCopyTime = copyCoolDownRef.current[key] || 0;
    if (now - lastCopyTime <  COPY_COLDOWN_TIME) return;

    copyCoolDownRef.current[key] = now;

    try{
      if(type==="text"){
        await writeText(value);
      }else{
        await writeClipboardImage(value);

      }
    }finally{

      // eslint-disable-next-line no-undef
      setTimeout(()=>{
        delete copyCoolDownRef.current[key];
      },COPY_COLDOWN_TIME);
    }

  };

  return (

    <div className="h-full flex flex-col bg-gray-200 dark:bg-primary">

      <TopBar deleteFunction={deleteAllItem} setFilter={setFilter} filter={filter} />

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <h2 className="text-gray-900 dark:text-quaternary text-base font-light tracking-tight mx-3">
          History
        </h2>

        <section className="flex flex-col gap-2 my-2 mx-1  ">
          {finalData.length > 0 ?
            finalData.map((item, index) => {

              const newIndex = calcIndex(index);

              return (
                <ContentCard
                  key={newIndex + item.value}
                  text={item.value}
                  type={item.type}
                  url={item.path}
                  toggleActions={toggleActions[newIndex]}
                  handleMenu={handleMenuClick(newIndex)}
                  handleDelete={handleDeleteClick(newIndex)}
                  handleEdit={handleEditClick(newIndex)}
                  handleSave={handleSaveClick(newIndex)}
                  handleFixed={handleFixedClick(newIndex)}
                  handleCopy={handleCopyClick(item.type==="text"?item.value:item.path??"", item.type)}
                />
              );
            }):
            <NoResult />
          }
        </section>
      </div>

    </div>

  );
};

export default History;
