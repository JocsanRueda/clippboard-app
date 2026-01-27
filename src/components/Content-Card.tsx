import { ContentCardProps } from "@/types/content-card.type";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { TiPin, TiPinOutline } from "react-icons/ti";
import ActionMenu from "./Action-Menu";
import ContentRenderer from "./Content-Renderer";
import CopyToast from "./UI-Components/CopyToast";

function ContentCard({ text, type,url, toggleActions, handleMenu , handleDelete ,handleEdit, handleSave, handleFixed, handleCopy}: ContentCardProps) {

  const [newText, setNewText] = useState<string>("");
  const [showToast, setShowToast] = useState(false);
  const { t } = useTranslation();

  // Save new text after edit
  const handleSaveText = () => {

    if (newText === "") return;

    handleSave(newText);
  };

  // Handle option click
  const handledOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenu();
    setNewText(text);
    if (showToast) {
      setShowToast(false);
    }
  };
  // Handle copy action
  const handleCopyInternal = () => {

    if (toggleActions.activeEdit) return;

    if (toggleActions.showMenu) {
      handleMenu();
      setNewText(text);
    }

    handleCopy();

    setShowToast(true);
  };

  // Sync newText with text prop when edit mode changes
  useEffect(()=>{

    if (toggleActions.activeEdit){
      setNewText(text);
    }else{
      setNewText("");
    }
  },[toggleActions.activeEdit, text]);

  const getPinIcon = () => {
    return toggleActions.fixed ? (<TiPin
      className=" text-gray-600 dark:text-quaternary transition-transform duration-150 hover:scale-115 cursor-pointer"
      onClick={handleFixed}
    />): (<TiPinOutline
      className=" text-gray-600 dark:text-quaternary transition-transform duration-150 hover:scale-115 cursor-pointer"
      onClick={handleFixed}
    />);
  };

  return (
    <div className="flex flex-row justify-between items-stretch  overflow-hidden">
      <div className="transition-[border] duration-100 w-full bg-gray-200 dark:bg-secondary py-2 px-2 mx-2 rounded-md hover:shadow-lg flex flex-row justify-between border-width-selected  border-gray-300 dark:border-tertiary-dark hover:border-gray-400 hover:dark:border-tertiary-light  transition-border  gap-2   "  onClick={handleCopyInternal} >

        {<ContentRenderer type={type} text={text} newText={newText} url={url} editText={toggleActions.activeEdit} setNewText={setNewText} />}

        <section className="ml-auto flex flex-col justify-between gap-2" onClick={(e)=>{e.stopPropagation();}}>

          <HiOutlineEllipsisHorizontal
            className="text-lg text-gray-600 dark:text-quaternary cursor-pointer hover:dark:text-gray-300 hover:text-gray-900  transition-colors duration-200"
            onClick={(e)=>handledOption(e)}
          />

          {getPinIcon()}
        </section>
      </div>

      {showToast ?
        <CopyToast onComplete={() => setShowToast(false)} text={t("copied")} /> :

        <ActionMenu
          toggleMenu={toggleActions.showMenu}
          handleDelete={handleDelete}
          disabledEdit={type !== "text"}
          editText={toggleActions.activeEdit}
          handleEdit={handleEdit}
          handleSave={handleSaveText}
        />
      }

    </div>
  );
}

export default memo(ContentCard);
