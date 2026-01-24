import { PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { useTranslation } from "react-i18next";
import { IoArrowForwardOutline } from "react-icons/io5";
import ContentSettings from "./Content-Settings";

export function Settings(){

  const { handlePage}= usePageContext();
  const { t } = useTranslation();

  const generalSettings=[
    {
      label:t("system_settings"),
      page:PAGES.SYSTEM_SETTINGS,
    },
    {
      label:t("themes"),
      page:PAGES.THEME,
    },
    {
      label:t("about"),
      page:PAGES.ABOUT,
    }
  ];

  return(
    <div className="flex flex-col w-full h-full bg-gray-200 dark:bg-primary" >

      <div className="flex-1 overflow-y-auto">

        <div className="w-full  flex flex-col justify-center items-center p-2 mb-5 overflow-x-scroll " >

          {generalSettings.map((setting)=>(
            <ContentSettings className="py-4" label={t(setting.label)}  key={setting.label} firstItem={generalSettings.indexOf(setting)===0} lastItem={generalSettings.indexOf(setting)===generalSettings.length-1} >

              <IoArrowForwardOutline className="w-5 h-5 text-gray-600 dark:text-gray-200  cursor-pointer  border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5 " onClick={() => handlePage(setting.page)} />

            </ContentSettings>
          ))}

        </div>
      </div>

    </div>
  );
}

export default Settings;
