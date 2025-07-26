
import { HiOutlineEllipsisHorizontal,HiDocumentText } from "react-icons/hi2";
import { TiPinOutline,TiPin } from "react-icons/ti";
import { MAX_TEXT_LENGTH } from "@/utils/constant";
import { useState } from "react";

import { SquareTextProps } from "@/types/square.type";


function ContentText({text}: {text: string}) {

   const displayText = text.length > MAX_TEXT_LENGTH ? text.slice(0, MAX_TEXT_LENGTH) + "..." : text;


   return (
    <p className="text-gray-900 dark:text-white text-base font-light tracking-tight ">

        {displayText}

      </p>
   )

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

function ContentVideo({text, url}: {text: string, url: string}) {

   return (
     <video controls className="max-w-full max-h-36 my-3 dark:bg-gray-700 rounded-md shadow-md">
       <source src={url} type="video/mp4" />
       {text}
     </video>
   )

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

function RenderContent({ type, text, url }: SquareTextProps) {
  switch (type) {
    case "text":
      return <ContentText text={text} />;
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



function SquareText({ text, type,url }: SquareTextProps) {
  const [pinned, setPinned] = useState(false);




  return (
    <div className="bg-gray-200 dark:bg-gray-700 py-2 px-2 mx-2 rounded-md shadow-md flex flex-row  justify-around border-2 hover:border-solid border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-border duration-200 ">

      {<RenderContent type={type} text={text} url={url} />}

      <section className="ml-auto mr-1.5 flex flex-col justify-between">
        <HiOutlineEllipsisHorizontal className="text-gray-100   "/>

        {pinned ? (
          <TiPin className="text-gray-100 " onClick={() => setPinned(false)} />
        ) : (
          <TiPinOutline className="text-gray-100 " onClick={() => setPinned(true)} />
        )}
      </section>

    </div>
  );
}



export default SquareText;