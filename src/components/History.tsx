import { data } from "@/mock/data";
import { handleElement } from "@/types/handle.type";
import { ItemClipboard } from "@/types/item-clippboard.type";
import { useState } from "react";
import SquareText from "./Content-Card";


function History() {

  

   
   const [toggleActions, setToggleActions] = useState<ItemActionMenu[]>(Array(data.length).fill({ showMenu: false, activeEdit: false }));


   //data list content originall data

   const [dataList, setDataList]= useState<ItemClipboard[]>(data)

   const handleToggleMenu = (index: number) => {
     updateToggleActions(index, { showMenu: !toggleActions[index].showMenu, activeEdit: false });
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
      const newDataList = dataList.filter((_, i) => i !== index);
      setDataList(newDataList);
   }

   const updateToggleActions = (index: number, updates: Partial<handleElement>) => {
     const newToggleActions = [...toggleActions];
     newToggleActions[index] = { ...newToggleActions[index], ...updates };
     setToggleActions(newToggleActions);
   };

   const updateDataList = (index: number, updates: Partial<ItemClipboard>) => {
     const newDataList = [...dataList];
     newDataList[index] = { ...newDataList[index], ...updates };
     setDataList(newDataList);
   };
  


  return (
    <div className="overflow-x-hidden">
      
      <h2 className={`text-gray-900 dark:text-white mt-5 text-base font-light tracking-tight mx-3`}>Clippboard</h2>
 

     <section className="flex flex-col gap-2 my-2 mx-1">
      {dataList.map((item, index) => (
       

          <SquareText 
          key={index} 
          text={item.text} 
          type={item.type} 
          url={item.url} 
          toggleActions={toggleActions[index]} 
          handleMenu={() => handleToggleMenu(index)} 
          handleDelete={() => handleDelete(index)} 
          handleEdit={() => handleEdit(index)} 
          handleSave={(newText: string) => handleSave(index, newText)} />

      ))}
      </section>
     
    </div>
  );
}


export default History;