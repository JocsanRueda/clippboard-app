import { deleteAllClipboardItems, removeClipboardItem, updateClipboardItem,fixedClipboardItem } from "@/api/tauri/clippboard";
import { defaultItemClipboard } from "@/default/values";
import { useClipboardWatcher } from "@/hooks/useClipboardWatcher";
import { useInitStore } from "@/hooks/useStore";
import { ItemClipboard } from "@/types/item-clippboard.type";
import { addUnique } from "@/utils/array";
import { clear, writeText } from '@tauri-apps/plugin-clipboard-manager';
import { Store } from "@tauri-apps/plugin-store";
import { useMemo, useRef, useState } from "react";
import ContentCard from "./Content-Card";
import TopBar from "./TopBar";

export const History = () => {
  

   const [dataList, setDataList]= useState<ItemClipboard[]>([])
   const [toggleActions, setToggleActions] = useState<ItemActionMenu[]>(Array(dataList.length).fill(defaultItemClipboard));
   const storeRef= useRef<Store | null>(null);
   const [filter, setFilter] = useState<string>("");


   // Initialize the store and load existing data
    useInitStore(storeRef, setDataList, setToggleActions);



   // Save the dataList to the store whenever it changes
   useClipboardWatcher((newText) => {
     updateClipboardDataList(newText);
    
   });

   // Save the dataList to the store whenever it changes
   //useSaveStore(dataList);


    // Function to update the clipboard data list with new text
   const updateClipboardDataList = (newText: string) => {
   const newDataList = addUnique(dataList, newText);

    // Check if the new data list is different from the current one
    if (newDataList.length !== dataList.length) {
      setDataList(newDataList);
      const newToggleActions = [...toggleActions, defaultItemClipboard]  ;
      setToggleActions(newToggleActions);

    }
  }


   //data list content originall data
  
   const handleToggleMenu = (index: number) => {
     const newToggleActions = Array((dataList.length)).fill(defaultItemClipboard);
     newToggleActions[index] = { showMenu: !toggleActions[index].showMenu, activeEdit: false };
     setToggleActions(newToggleActions);
   }


   //save new text after edit
   const handleSave = async (index: number, newText: string) => {

      const length = dataList.length-1;
      updateDataList(index, { text: newText });
      updateToggleActions(index, { showMenu: true, activeEdit: false });

      // Update the clipboard item
      await updateClipboardItem(index,newText);

      if (index === length) {
        // write the new text to the clipboard
        await writeText(newText);
      }
   }

   //toggle edit mode
    const handleEdit = (index: number) => {
      updateToggleActions(index, { activeEdit: !toggleActions[index].activeEdit });
    }

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
    
   }
 
   //toggle fixed state
   const handleFixed = async (index: number) => {
     updateToggleActions(index, { fixed: !toggleActions[index].fixed });

     updateDataList(index, { fixed: !dataList[index].fixed });

     await fixedClipboardItem(index,(!toggleActions[index].fixed));
   }


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
     
   }



 


const filteredData = useMemo(() => {
    if (filter.length === 0) return dataList;
    const lowerCaseFilter = filter.toLowerCase().trim();
    return dataList.filter(item => item.text.toLowerCase().startsWith(lowerCaseFilter));
  }, [filter, dataList]);

  const handleMenuClick = (index: number) => () => handleToggleMenu(index);
  const handleDeleteClick = (index: number) => () => handleDelete(index);
  const handleEditClick = (index: number) => () => handleEdit(index);
  const handleSaveClick = (index: number) => (newText: string) => handleSave(index, newText);
  const handleFixedClick = (index: number) => () => handleFixed(index);


  return (

  <>
 


    <TopBar deleteFunction={deleteAllItem} setFilter={setFilter} filter={filter} />

    <div className="overflow-x-hidden">
      <h2 className="text-gray-900 dark:text-white text-base font-light tracking-tight mx-3">
        Clippboard
      </h2>

      <section className="flex flex-col gap-2 my-2 mx-1">
        {filteredData.length > 0 &&
          filteredData.map((item, index) => (
            <ContentCard
              key={index + item.text}
              text={item.text}
              type={item.type}
              url={item.url}
              toggleActions={toggleActions[index]}
              handleMenu={handleMenuClick(index)}
              handleDelete={handleDeleteClick(index)}
              handleEdit={handleEditClick(index)}
              handleSave={handleSaveClick(index)}
              handleFixed={handleFixedClick(index)}
            />
          ))}
      </section>
    </div>
  
</>
    
  );
}


export default History;