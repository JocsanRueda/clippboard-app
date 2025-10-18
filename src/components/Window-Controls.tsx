import { getCurrentWindow } from "@tauri-apps/api/window";
import { IoCloseSharp } from "react-icons/io5";

export default function WindowControls() {
  const appWindow = getCurrentWindow();

  return (
    <div
      id="titlebar"
      data-tauri-drag-region
      className="fixed top-0 right-0 w-full flex justify-end items-center bg-gray-300 dark:bg-secondary gap-2 z-100 p-0.5 px-3 rounded-t-md overflow-hidden"
    >
      <button
        onClick={() => {
          appWindow.close();

        }}
      >
        <IoCloseSharp className="font-bold h-5 w-5 text-gray-900 dark:text-quaternary" />
      </button>
    </div>
  );
}
