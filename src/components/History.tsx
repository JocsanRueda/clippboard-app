import { defaultItemClipboard } from "@/default/values";
import { useClipboardWatcher } from "@/hooks/useClipboardWatcher";
import { useSaveStore } from "@/hooks/useSaveStore";
import { useInitStore } from "@/hooks/useStore";
import { ItemClipboard } from "@/types/item-clippboard.type";
import { addUnique } from "@/utils/array";
import { Store } from "@tauri-apps/plugin-store";
import { useRef, useState } from "react";
import ContentCard from "./Content-Card";


export const History = () => {
  
   

   const [dataList, setDataList]= useState<ItemClipboard[]>([])
   const [toggleActions, setToggleActions] = useState<ItemActionMenu[]>(Array(dataList.length).fill(defaultItemClipboard));
   const storeRef= useRef<Store | null>(null);


   // Initialize the store and load existing data
   useInitStore(storeRef, setDataList, setToggleActions);


   // Save the dataList to the store whenever it changes
   useClipboardWatcher((newText) => {
     updateClipboardDataList(newText);
    
   }, 500);

   // Save the dataList to the store whenever it changes
   useSaveStore(storeRef, dataList);


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
   const handleSave = (index: number, newText: string) => {
      updateDataList(index, { text: newText });
      updateToggleActions(index, { showMenu: true, activeEdit: false });
   }

   //toggle edit mode
    const handleEdit = (index: number) => {
      updateToggleActions(index, { activeEdit: !toggleActions[index].activeEdit });
    }

    //delete item from data list
   const handleDelete = (index: number) => {
      const newDataList = (dataList ?? []).filter((_, i) => i !== index);
      const newToggleActions = (toggleActions ?? []).filter((_, i) => i !== index);
      setToggleActions(newToggleActions); 
      setDataList(newDataList);
    
   }
 
   //toggle fixed state
   const handleFixed = (index: number) => {
     updateToggleActions(index, { fixed: !toggleActions[index].fixed });
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
  


  return (
    <div className="overflow-x-hidden">
      
      <h2 className={`text-gray-900 dark:text-white mt-1   text-base font-light tracking-tight mx-3`}>Clippboard</h2>
 

     <section className="flex flex-col gap-2 my-2 mx-1">
      {dataList.length > 0 && (dataList).map((item, index) => (
       

          <ContentCard 
          key={index + item.text} 
          text={item.text} 
          type={item.type} 
          url={item.url} 
          toggleActions={toggleActions[index]} 
          handleMenu={() => handleToggleMenu(index)} 
          handleDelete={() => handleDelete(index)} 
          handleEdit={() => handleEdit(index)} 
          handleSave={(newText: string) => handleSave(index, newText)}
          handleFixed={() => handleFixed(index)} 
          
          />

      ))}
      </section>
     
    </div>
  );
}


export default History;