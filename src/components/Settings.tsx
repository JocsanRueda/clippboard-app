import { PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { useTranslation } from "react-i18next";
import { IoArrowForwardOutline } from "react-icons/io5";
import ContentSettings from "./Content-Settings";

export function Settings(){

  const { handlePage}= usePageContext();
  const { t } = useTranslation();

  return(
    <div className="flex flex-col w-full h-full bg-gray-200 dark:bg-primary" >

      <div className="flex-1 overflow-y-auto px-1">

        <div className="w-full  flex flex-col justify-center items-center p-2 mb-5 overflow-x-scroll " >

          <ContentSettings label={t("system_settings")} className="rounded-t-md border-width-selected py-3">

            <IoArrowForwardOutline className="w-5 h-5 text-gray-600 dark:text-gray-200  cursor-pointer  border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5 " onClick={() => handlePage(PAGES.SYSTEM_SETTINGS)} />

          </ContentSettings>

          <ContentSettings label={t("themes")} className="border-x-width-selected border-b-width-selected  ">
            <IoArrowForwardOutline className="w-5 h-5 text-gray-600 dark:text-gray-200  cursor-pointer  border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5 " onClick={() => handlePage(PAGES.THEME)} />

          </ContentSettings>

          <ContentSettings label={t("about")} className=" border-x-width-selected border-b-width-selected  rounded-b-md py-3">

            <IoArrowForwardOutline className="w-5 h-5 text-gray-600 dark:text-gray-200  cursor-pointer  border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5 " onClick={() => handlePage(PAGES.ABOUT)} />

          </ContentSettings>

        </div>
      </div>

    </div>
  );
}

export default Settings;
