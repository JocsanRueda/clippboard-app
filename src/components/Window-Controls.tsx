
import { getCurrentWindow } from "@tauri-apps/api/window";
import { IoCloseSharp } from "react-icons/io5";
import { VscChromeMaximize, VscChromeMinimize } from "react-icons/vsc";
export default function WindowControls({roundedWindow}: {roundedWindow: boolean}) {

  const window = getCurrentWindow();

  const handleClose = async () => {
    await window.close();
  };

  const handleMinimize = async () => {
    await window.minimize();
  };

  const handleMaximize = async () => {

    const isMaximized = await window.isMaximized();

    if (isMaximized){
      await window.unmaximize();
    }else{
      await window.maximize();
    }

  };

  return (
    <div
      id="titlebar"
      data-tauri-drag-region
      className={`fixed top-0 right-0 w-full flex justify-end items-center bg-gray-300 dark:bg-secondary gap-1.5 z-100 py-0.5 px-2  overflow-hidden border-t-2 border-x-2 border-gray-500 ${roundedWindow?" rounded-t-lg ":""}`}
    >

      <button
        onClick={handleMinimize}
      >
        <VscChromeMinimize className="font-bold h-4 w-4 mr-0.5 transition-colors duration-100 text-gray-900 dark:text-quaternary hover:text-gray-500 hover:dark:text-quaternary-dark" style={{strokeWidth:0.5}}/>
      </button>

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
