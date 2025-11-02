import { offShortcuts, onShortcuts } from "@/api/tauri/clipboard";
import { PAGES } from "@/constants/constant";
import { keyboardLaunchOptions, languagesOptions, limitItemsOptions, orderItemsOptions, roundedWindowOptions, timeOptions } from "@/constants/sytem-options";
import { usePageContext } from "@/context/Page-Contex";
import { useSystemSettingsContext } from "@/context/System-Settings-Context";
import { SystemSettings as SystemSettingsProps } from "@/types/system-settings.type";
import { useEffect, useRef, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import ContentSettings from "./Content-Settings";
import Dropdown from "./UI-Components/Dropdown";
import ShortcutInput from "./UI-Components/Shorcut-input";
export function SystemSettings(){

  const {handlePage}= usePageContext();

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const [isEditing, setIsEditing]= useState<boolean>(false);

  const {settings, setSystemSettings} = useSystemSettingsContext();

  const shorcutsRef= useRef<string>(settings.keyboard_shortcuts);

  useEffect(()=>{

    const handleEditing = async ()=>{

      try{
        if(isEditing){

          await offShortcuts(shorcutsRef.current);
        }else{

          await onShortcuts(shorcutsRef.current);

        }

      }catch(error){
        console.error("Failed to set editing state", error);
      }

    };

    handleEditing();
  },[isEditing]);

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

  const handleShorcutChange = async (combo: string) => {
    handleSelect(keyboardLaunchOptions.key as keyof SystemSettingsProps, combo);
    shorcutsRef.current = combo;
  };

  const settingsConfig = [
    timeOptions,
    limitItemsOptions,
    languagesOptions,
    orderItemsOptions,
    roundedWindowOptions
  ];

  return(
    <div className="w-full max-w-md flex flex-col justify-center items-center p-2 mb-5">

      <ContentSettings label="Theme" className="rounded-t-md border-width-selected py-3">

        <IoArrowForwardOutline className="w-5 h-5 text-gray-600 dark:text-gray-200  cursor-pointer  border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5 " onClick={() => handlePage(PAGES.THEME)} />

      </ContentSettings>

      {settingsConfig.map((cfg, idx) => (
        <ContentSettings label={cfg.label} key={cfg.key} className={"border-x-4 border-b-width-selected"}>
          <Dropdown
            options={cfg.items}
            onSelect={(value) => handleSelect(cfg.key as keyof SystemSettingsProps, value)}
            selectedValue={settings[cfg.key as keyof SystemSettingsProps]}
            isOpen={openDropdown === idx}
            onToggle={() => handleDropdownToggle(idx)}
          />
        </ContentSettings>

      ))}
      <ContentSettings label="Keyboard Launch" className="border-x-width-selected border-b-width-selected rounded-b-md ">
        <ShortcutInput
          value={settings.keyboard_shortcuts}
          onChange={(combo) => handleShorcutChange(combo ?? "")}
          placeholder="Pulsa la combinación"
          setEditing={setIsEditing}
        />
      </ContentSettings>

    </div>
  );
}
