import { PAGES } from "@/constants/constant";
import { keyboardLaunchOptions, languagesOptions, limitItemsOptions, timeOptions,DEFAULT_SYSTEM_SETTINGS } from "@/constants/sytem-options";
import { usePageContext } from "@/context/Page-Contex";
import { useEffect, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import ContentSettings from "./Content-Settings";
import Dropdown from "./UI-Components/Dropdown";
import { SystemSettings as SystemSettingsProps } from "@/types/system-settings.type";
import { saveSettings,getSettings } from "@/utils/store";
export function SystemSettings(){

  const {handlePage}= usePageContext();

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const [systemSettings, setSystemSettings] = useState<SystemSettingsProps>(DEFAULT_SYSTEM_SETTINGS);

  const handleDropdownToggle = (dropdownId: number) => {
    setOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  useEffect(()=>{
    async function loadSettings(){
      const s= await getSettings();
      if(s){

        setSystemSettings(s);
      }

    }

    loadSettings();

  },[]);

  const handleSelect = async (key: keyof SystemSettingsProps, value: string | number) => {
    const newSettings={
      ...systemSettings,
      [key]: value
    };

    setSystemSettings(newSettings);

    try{
      await saveSettings(newSettings);
    }catch (error) {
      console.error("Error saving settings:", error);
    }

  };

  const settingsConfig = [
    timeOptions,
    limitItemsOptions,
    languagesOptions,
    keyboardLaunchOptions,
  ];

  return(
    <div className="w-full max-w-md flex flex-col justify-center items-center p-2">

      <ContentSettings label="Theme" className="rounded-t-md border-3 py-3">

        <IoArrowForwardOutline className="w-7.5 h-7.5 text-quaternary  cursor-pointer border-3 border-gray-300 dark:border-none rounded-md  ml-0.5 p-0.5 " onClick={() => handlePage(PAGES.THEME)} />

      </ContentSettings>

      {settingsConfig.map((cfg, idx) => (
        <ContentSettings label={cfg.label} key={cfg.key} className={`border-x-3 border-b-3 ${idx===settingsConfig.length-1?"rounded-b-md":""}`}>
          <Dropdown
            options={cfg.items}
            onSelect={(value) => handleSelect(cfg.key as keyof SystemSettingsProps, value)}
            selectedValue={systemSettings[cfg.key as keyof SystemSettingsProps]}
            isOpen={openDropdown === idx}
            onToggle={() => handleDropdownToggle(idx)}
          />
        </ContentSettings>
      ))}
    </div>
  );
}
