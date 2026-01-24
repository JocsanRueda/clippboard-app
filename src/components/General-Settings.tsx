import { ICON_SETTINGS_SIZE, PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import About from "@/pages/About";
import { useTranslation } from "react-i18next";
import { IoArrowBackOutline } from "react-icons/io5";
import { NewTheme } from "./New-Theme";
import Settings from "./Settings";
import { SystemSettings } from "./System-Settings";
import { ThemeSettings } from "./Theme-Settings";

export function GeneralSettings(){

  const {currentPage,goBack}= usePageContext();
  const { t } = useTranslation();

  return(
    <div className="flex flex-col w-full h-full  bg-gray-200 dark:bg-primary" >
      <div className="w-full relative flex items-center justify-center my-2">
        <IoArrowBackOutline size={ICON_SETTINGS_SIZE} className="absolute left-2 z-10  text-gray-600 dark:text-gray-200  cursor-pointer border-width-selected border-gray-200 dark:border-none hover:border-gray-400 rounded-md" onClick={() => goBack()} />
        <h1 className="font-bold text-black dark:text-white">{t(currentPage??"")}</h1>
      </div>

      <div className="flex-1 overflow-y-auto ">
        {currentPage === PAGES.SYSTEM_SETTINGS && <SystemSettings  />}
        {currentPage === PAGES.THEME && <ThemeSettings  />}
        {currentPage ===PAGES.NEW_THEME && <NewTheme />}
        {currentPage === PAGES.ABOUT && <About />}
        {currentPage=== PAGES.SETTINGS && <Settings />}

      </div>

    </div>
  );
}

export default GeneralSettings;
