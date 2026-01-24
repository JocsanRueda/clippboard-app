
import { ICON_WINDOW_CONTROL_SIZE } from "@/constants/constant";
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
      className={`  w-full flex justify-end items-center bg-gray-300 dark:bg-secondary gap-1.5 z-100 py-0.5 px-2  overflow-hidden ${roundedWindow?" rounded-t-lg ":""}`}
    >

      <button
        onClick={handleMinimize}
      >
        <VscChromeMinimize size={ICON_WINDOW_CONTROL_SIZE} className="font-bold  mr-0.5 transition-colors duration-100 text-gray-900 dark:text-quaternary hover:text-gray-500 hover:dark:text-quaternary-dark" style={{strokeWidth:0.5}}/>
      </button>

      <button
        onClick={handleMaximize}
      >
        <VscChromeMaximize  size={ICON_WINDOW_CONTROL_SIZE} className="font-bold  transition-colors duration-100 text-gray-900 dark:text-quaternary hover:text-gray-500 hover:dark:text-quaternary-dark" style={{strokeWidth:0.6}}/>
      </button>
      <button
        onClick={handleClose}
      >
        <IoCloseSharp size={ICON_WINDOW_CONTROL_SIZE} className="font-bold transition-colors duration-100 text-gray-900 dark:text-quaternary hover:text-gray-500 hover:dark:text-quaternary-dark" />
      </button>
    </div>
  );
}
