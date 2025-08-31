import { ContentCardProps } from "@/types/content-card.type";
import { useState } from "react";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { TiPin, TiPinOutline } from "react-icons/ti";
import ActionMenu from "./Action-Menu";
import ContentRenderer from "./Content-Renderer";

function ContentCard({ text, type,url, toggleActions, handleMenu , handleDelete ,handleEdit, handleSave, handleFixed }: ContentCardProps) {

  const [newText, setNewText] = useState(text);

  const handleSaveText = () => {
    handleSave(newText);
  };

  const handledOption=()=>{
    handleMenu();
  };

  const getPinIcon = () => {
    return toggleActions.fixed ? (<TiPin
      className=" text-gray-600 dark:text-gray-100 transition-transform duration-150 hover:scale-115 cursor-pointer"
      onClick={handleFixed}
    />): (<TiPinOutline
      className=" text-gray-600 dark:text-gray-100 transition-transform duration-150 hover:scale-115 cursor-pointer"
      onClick={handleFixed}
    />);
  };

  return (
    <div className="flex flex-row justify-between items-stretch  ">
      <div className="w-full bg-gray-200 dark:bg-gray-700 py-2 px-2 mx-2 rounded-md shadow-md flex flex-row justify-between border-3 hover:border-solid border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-border  gap-2   ">

        {<ContentRenderer type={type} text={newText} url={url} editText={toggleActions.activeEdit} setText={setNewText} />}

        <section className="ml-auto flex flex-col justify-between gap-2">

          <HiOutlineEllipsisHorizontal
            className="text-gray-600 dark:text-gray-100 cursor-pointer hover:dark:text-gray-300 hover:text-gray-900  transition-colors duration-200"
            onClick={()=>handledOption()}
          />

          {getPinIcon()}
        </section>
      </div>
      {<ActionMenu
        toggleMenu={toggleActions.showMenu}
        handleDelete={handleDelete}
        disabledEdit={type !== "text"}
        editText={toggleActions.activeEdit}
        handleEdit={handleEdit}
        handleSave={handleSaveText}
      />}
    </div>
  );
}

export default ContentCard;
