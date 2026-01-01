
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { VscChromeMaximize } from "react-icons/vsc";
export default function WindowControls({roundedWindow}: {roundedWindow: boolean}) {

  const [maximized, setMaximized] = useState<boolean>(false);

  const window = getCurrentWindow();

  const handleClose = async () => {
    await window.close();
  };

  const handleMaximize = async () => {

    if (maximized) {
      await window.unmaximize();
    }else{
      await window.maximize();
    }
    setMaximized(!maximized);

  };

  return (
    <div
      id="titlebar"
      data-tauri-drag-region
      className={`fixed top-0 right-0 w-full flex justify-end items-center bg-gray-300 dark:bg-secondary gap-1.5 z-100 py-1 px-2  overflow-hidden border-t-2 border-x-2 border-gray-900 ${roundedWindow?" rounded-t-lg ":""}`}
    >

      <button
        onClick={handleMaximize}
      >
        <VscChromeMaximize className="font-bold h-4 w-4 transition-colors duration-100 text-gray-900 dark:text-quaternary hover:text-gray-500 hover:dark:text-quaternary-dark" style={{strokeWidth:0.6}}/>
      </button>
      <button
        onClick={handleClose}
      >
        <IoCloseSharp className="font-bold h-5 w-5 transition-colors duration-100 text-gray-900 dark:text-quaternary hover:text-gray-500 hover:dark:text-quaternary-dark" />
      </button>
    </div>
  );
}
