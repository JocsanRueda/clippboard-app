

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

   const [toggleMenu, setToggleMenu] = useState(Array(data.length).fill(false));

   const handleToggleMenu = (index: number) => {
     const newToggleMenu= Array(data.length).fill(false);
     newToggleMenu[index] = !toggleMenu[index];
     setToggleMenu(newToggleMenu);
   }


  return (
    <div className="overflow-x-hidde">
      
      <h2 className={`text-gray-900 dark:text-white mt-5 text-base font-light tracking-tight mx-3`}>Clippboard</h2>
 

     <section className="flex flex-col gap-2 my-2 mx-1">
      {data.map((item, index) => (

          <SquareText key={index} text={item.text} type={item.type} url={item.url} toggleMenu={toggleMenu[index]} onClick={() => handleToggleMenu(index)} />

      ))}
      </section>
     
    </div>
  );
}


export default History;