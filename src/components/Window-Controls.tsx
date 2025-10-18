import { getCurrentWindow } from "@tauri-apps/api/window";
import { IoCloseSharp } from "react-icons/io5";

export default function WindowControls() {
  const appWindow = getCurrentWindow();

  return (
    <div
      id="titlebar"
      data-tauri-drag-region
      className="fixed top-0 right-0 w-full flex justify-end items-center bg-gray-300 dark:bg-secondary gap-2 z-100 py-1 px-2 rounded-t-lg overflow-hidden"
    >
      <button
        onClick={() => {
          appWindow.close();

        }}
      >
        <IoCloseSharp className="font-bold h-5 w-5 transition-colors duration-100 text-gray-900 dark:text-quaternary hover:text-gray-500 hover:dark:text-quaternary-dark" />
      </button>
    </div>
  );
}
