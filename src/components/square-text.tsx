import { HiOutlineEllipsisHorizontal,HiDocumentText } from "react-icons/hi2";
import { TiPinOutline,TiPin } from "react-icons/ti";
import { MAX_TEXT_LENGTH } from "@/utils/constant";
import { useState } from "react";

import { SquareTextProps,SquareTextComponentProps } from "@/types/square.type";
import OptionSquare from "./OptionSquare";


function ContentText({text, editText,newText, setText}: {text: string, editText: boolean, newText: string, setText: (newText: string) => void}) {

   const displayText = text.length > MAX_TEXT_LENGTH ? text.slice(0, MAX_TEXT_LENGTH) + "..." : text;


   if (editText){
   
    return (
      <textarea
        className="w-full  h-28 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base font-light tracking-tight "
        value={newText}
        onChange={(e) => setText(e.target.value)}
        maxLength={50*MAX_TEXT_LENGTH}
      />
    );
   }else{

     return (<p className="text-gray-900 dark:text-white text-base font-light tracking-tight ">

        {displayText}

    </p>)
    
   }

}

function ContentImage({text,url}: {url: string, text: string}) {

   return (
     <img src={url} alt={text} className="max-w-full max-h-36 rounded-md shadow-md" />
   )

}

function ContentAudio({text, url}: {text: string, url: string}) {

   return (
    
     <audio controls className="max-w-full max-h-36 my-3 dark:bg-gray-700 rounded-md shadow-md">
       <source src={url} type="audio/mpeg" />
       {text}
     </audio>
   )

}

function ContentVideo({ text, url }: { text: string; url: string }) {
  return (
    <div className="relative w-full max-w-full max-h-96 overflow-hidden rounded-md shadow-md dark:bg-gray-700">
      <video
        controls
        className="w-full h-auto"
      >
        <source src={url} type="video/mp4" />
        {text}
      </video>
    </div>
  );
}

function ContentDocument({text, url}: {text: string, url: string}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center space-x-2 max-w-full my-3 px-2 py-1 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="truncate text-gray-900 dark:text-white text-base font-light tracking-tight p-1">
        <HiDocumentText className="inline mr-1 text-6xl" />
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{text}</span>
    </a>
  );
}

function RenderContent({ type, text, url,editText, newText, setText }: SquareTextProps & {editText:boolean, newText: string, setText: (newText: string) => void}) {
  switch (type) {
    case "text":
      return <ContentText text={text} editText={editText} newText={newText} setText={setText} />;
    case "image":
      return <ContentImage text={text} url={url ?? ""} />;
    case "audio":
      return <ContentAudio text={text} url={url ?? ""} />;
    case "video":
      return <ContentVideo text={text} url={url ?? ""} />;
    case "document":
      return <ContentDocument text={text} url={url ?? ""} />;
    default:
      return null;
  }
}



function SquareText({ text, type,url, toggleMenu,toggleEdit, handleMenu , handleDelete ,handleEdit, handleSave }: SquareTextComponentProps) {

  const [pinned, setPinned] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleSaveText = () => {
    handleSave(newText);
  };

  const handledOption=()=>{
    handleMenu();
  }


  return (
    <div className="flex flex-row justify-between items-stretch  ">
      <div className="w-full bg-gray-200 dark:bg-gray-700 py-2 px-2 mx-2 rounded-md shadow-md flex flex-row justify-between border-3 hover:border-solid border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-border  gap-2   ">

      {<RenderContent type={type} text={text} url={url} editText={toggleEdit} newText={newText} setText={setNewText} />}

      <section className="ml-auto flex flex-col justify-between gap-2">
      
        <HiOutlineEllipsisHorizontal
          className="text-gray-100 cursor-pointer hover:text-gray-300 transition-colors duration-200"
          onClick={()=>handledOption()}
        />  

       
        {pinned ? (
          <TiPin
            className="text-gray-100 transition-transform duration-150 hover:scale-115 cursor-pointer"
            onClick={() => setPinned(false)}
          />
        ) : (
          <TiPinOutline
            className="text-gray-100 transition-transform duration-150 hover:scale-115 cursor-pointer"
            onClick={() => setPinned(true)}
          />
        )}
      </section>
    </div>
    {<OptionSquare toggleMenu={toggleMenu} handleDelete={handleDelete} disabledEdit={type !== "text"} editText={toggleEdit} handleEdit={handleEdit} handleSave={handleSaveText} />}
    </div>
  );
}

export default SquareText;