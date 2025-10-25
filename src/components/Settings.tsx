import { usePageContext } from "@/context/Page-Contex";
import { IoArrowBackOutline } from "react-icons/io5";
import { SystemSettings } from "./System-Settings";
import { ThemeSettings } from "./Theme-Settings";
import { PAGES } from "@/constants/constant";
import { NewTheme } from "./New-Theme";

export function Settings(){

  const {currentPage,goBack}= usePageContext();

  return(
    <div className="flex flex-col w-full h-full bg-gray-200 dark:bg-primary" >
      <div className="w-full grid grid-cols-3 gap-2 my-2">
        <IoArrowBackOutline className="w-5.5 h-5.5 text-gray-600 dark:text-gray-200  cursor-pointer border-width-selected border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5" onClick={() => goBack()} />
        <h1 className="mx-auto font-bold text-black dark:text-white">{currentPage}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-1">
        {currentPage === PAGES.SETTINGS && <SystemSettings  />}
        {currentPage === PAGES.THEME && <ThemeSettings  />}
        {currentPage ===PAGES.NEW_THEME && <NewTheme />}
      </div>

    </div>
  );
}

export default Settings;
