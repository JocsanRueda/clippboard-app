

import { SquareTextProps } from "@/types/square.type";
import SquareText from "./square-text";
import { useState } from "react";


function History() {

   const data : SquareTextProps[]=[
    {
      text: "This is a sample text that has been copied to the clipboard.",
      type: "text"
    },
    {
      text: "This text is also part of the clipboard history, showcasing how it This text is also part of the clipboard history, showcasing how itThis text is also part of the clipboard history, showcasing how it.",
      type: "text"
    },
    {
      text: "This is a image",
      type: "image",
      url: "https://static.getimg.ai/media/getimg_ai_img-uXZgKW7ZjTW9WBdjLofIG.jpeg"
    },
    {
      text: "This is a audio",
      type: "audio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      text: "This is a video",
      type: "video",
      url: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      text: "This is a document",
      type: "document",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    }
   ]

   type handleElement ={
    showMenu:boolean,
    activeEdit:boolean,
   }

   const [toggleMenu, setToggleMenu] = useState<handleElement[]>(Array(data.length).fill({ showMenu: false, activeEdit: false }));

   const [dataList, setDataList]= useState<SquareTextProps[]>(data)

   const handleToggleMenu = (index: number) => {
     const newToggleMenu= Array(data.length).fill({ showMenu: false, activeEdit: false });

     newToggleMenu[index]={ showMenu: !toggleMenu[index].showMenu, activeEdit: false};

     setToggleMenu(newToggleMenu);
   }

   const handleSave = (index: number, newText: string) => {
      const newDataList = [...dataList];
      newDataList[index].text = newText;
      setDataList(newDataList);
  
      const newToggleMenu = [...toggleMenu];
      newToggleMenu[index] = { showMenu: true, activeEdit: false };
      setToggleMenu(newToggleMenu);
   }

    const handleEdit = (index: number) => {
      const newToggleMenu = [...toggleMenu];
      newToggleMenu[index]={ showMenu: newToggleMenu[index].showMenu, activeEdit: !newToggleMenu[index].activeEdit };
      setToggleMenu(newToggleMenu);
    }


   const handleDelete = (index:number)=>{

    const newDataList=dataList.filter((_,i)=> i!==index)

    setDataList(newDataList)

   }




  


  return (
    <div className="overflow-x-hidden">
      
      <h2 className={`text-gray-900 dark:text-white mt-5 text-base font-light tracking-tight mx-3`}>Clippboard</h2>
 

     <section className="flex flex-col gap-2 my-2 mx-1">
      {dataList.map((item, index) => (
       

          <SquareText key={index} text={item.text} type={item.type} url={item.url} toggleMenu={toggleMenu[index].showMenu} toggleEdit={toggleMenu[index].activeEdit} handleMenu={() => handleToggleMenu(index)} handleDelete={() => handleDelete(index)} handleEdit={() => handleEdit(index)} handleSave={(newText) => handleSave(index, newText)} />

      ))}
      </section>
     
    </div>
  );
}


export default History;