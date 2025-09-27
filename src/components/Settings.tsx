import { usePageContext } from "@/context/Page-Contex";
import { IoArrowBackOutline } from "react-icons/io5";
import { SystemSettings } from "./System-Settings";
import { ThemeSettings } from "./Theme-Settings";
import { PAGES } from "@/constants/constant";
import { NewTheme } from "./New-Theme";

export function Settings(){

  const {currentPage,goBack}= usePageContext();

  return(
    <div className="flex flex-col  items-center w-full h-full min-h-screen bg-gray-100 dark:bg-primary mb-3" >
      <div className="w-full grid grid-cols-3 gap-2 my-2">
        <IoArrowBackOutline className="w-7 h-7 text-gray-600 dark:text-gray-200  cursor-pointer border-3 border-gray-100 dark:border-none hover:border-gray-400 rounded-md  ml-1.5" onClick={() => goBack()} />
        <h1 className="mx-auto font-bold text-black dark:text-white">{currentPage}</h1>
      </div>

      {currentPage === PAGES.SETTINGS && <SystemSettings  />}
      {currentPage === PAGES.THEME && <ThemeSettings  />}
      {currentPage ===PAGES.NEW_THEME && <NewTheme />}

    </div>
  );
}

export default Settings;
