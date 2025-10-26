import { PAGES } from "@/constants/constant";
import { keyboardLaunchOptions, languagesOptions, limitItemsOptions, orderItemsOptions, roundedWindowOptions, timeOptions } from "@/constants/sytem-options";
import { usePageContext } from "@/context/Page-Contex";
import { useSystemSettingsContext } from "@/context/System-Settings-Context";
import { SystemSettings as SystemSettingsProps } from "@/types/system-settings.type";
import { useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import ContentSettings from "./Content-Settings";
import Dropdown from "./UI-Components/Dropdown";
export function SystemSettings(){

  const {handlePage}= usePageContext();

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const {settings, setSystemSettings} = useSystemSettingsContext();

  const handleDropdownToggle = (dropdownId: number) => {
    setOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  const handleSelect = async (key: keyof SystemSettingsProps, value: string | number | boolean) => {
    const newSettings={
      ...settings,
      [key]: value
    };

    setSystemSettings(newSettings);

  };

  const settingsConfig = [
    timeOptions,
    limitItemsOptions,
    languagesOptions,
    orderItemsOptions,
    keyboardLaunchOptions,
    roundedWindowOptions
  ];

  return(
    <div className="w-full max-w-md flex flex-col justify-center items-center p-2">

      <ContentSettings label="Theme" className="rounded-t-md border-width-selected py-3">

        <IoArrowForwardOutline className="w-5 h-5 text-gray-600 dark:text-gray-200  cursor-pointer  border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5 " onClick={() => handlePage(PAGES.THEME)} />

      </ContentSettings>

      {settingsConfig.map((cfg, idx) => (
        <ContentSettings label={cfg.label} key={cfg.key} className={`border-x-4 border-b-width-selected ${idx===settingsConfig.length-1?"rounded-b-md":""}`}>
          <Dropdown
            options={cfg.items}
            onSelect={(value) => handleSelect(cfg.key as keyof SystemSettingsProps, value)}
            selectedValue={settings[cfg.key as keyof SystemSettingsProps]}
            isOpen={openDropdown === idx}
            onToggle={() => handleDropdownToggle(idx)}
          />
        </ContentSettings>
      ))}
    </div>
  );
}
