import { useClipboardWatcher } from "@/hooks/useClipboardWatcher";
import { ItemClipboard } from "@/types/item-clippboard.type";
import { addUnique } from "@/utils/array";
import { useState } from "react";
import ContentCard from "./Content-Card";

function History() {
  

  
   

   const [dataList, setDataList]= useState<ItemClipboard[]>([])
   const [toggleActions, setToggleActions] = useState<ItemActionMenu[]>(Array(dataList.length).fill({ showMenu: false, activeEdit: false, fixed: false }));


   useClipboardWatcher((newText) => {
     updateClipboardDataList(newText);

   }, 500);
  
    
   

   const updateClipboardDataList = (newText: string) => {
    const newDataList = addUnique(dataList, newText);

     setDataList(newDataList);

     const newToggleActions = [...toggleActions, { showMenu: false, activeEdit: false, fixed: false }]  ;
     setToggleActions(newToggleActions);
   }






   //data list content originall data

  
   const handleToggleMenu = (index: number) => {
     const newToggleActions = Array((dataList?.length ?? 0)).fill({ showMenu: false, activeEdit: false, fixed: false });
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
      setDataList(newDataList);
   }

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
  

  console.log("Data List:", dataList);
  return (
    <div className="overflow-x-hidden">
      
      <h2 className={`text-gray-900 dark:text-white mt-1   text-base font-light tracking-tight mx-3`}>Clippboard</h2>
 

     <section className="flex flex-col gap-2 my-2 mx-1">
      {dataList.length > 0 && (dataList).map((item, index) => (
       

          <ContentCard 
          key={index} 
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