import { offShortcuts, onShortcuts } from "@/api/tauri/clipboard";
import { PAGES } from "@/constants/constant";
import { keyboardLaunchOptions, languagesOptions, limitItemsOptions, orderItemsOptions, roundedWindowOptions, timeOptions,fontSizeOptions } from "@/constants/sytem-options";
import { usePageContext } from "@/context/Page-Contex";
import { useSystemSettingsContext } from "@/context/System-Settings-Context";
import { SystemSettings as SystemSettingsProps } from "@/types/system-settings.type";
import React,{ useEffect, useRef, useState } from "react";
import { IoArrowForwardOutline } from "react-icons/io5";
import ContentSettings from "./Content-Settings";
import Dropdown from "./UI-Components/Dropdown";
import ShortcutInput from "./UI-Components/Shorcut-input";
import { UnityInput } from "./UI-Components/Unitiy-input";
import { useTranslation } from "react-i18next";
import { resizeWindow } from "@/api/tauri/windows";
export function SystemSettings(){

  const {handlePage}= usePageContext();

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const [isEditing, setIsEditing]= useState<boolean>(false);

  const {settings, setSystemSettings} = useSystemSettingsContext();

  const [tempSettings, setTempSettings]= useState<SystemSettingsProps>(settings);

  const shorcutsRef= useRef<string>(settings.keyboard_shortcut);

  const { t } = useTranslation();

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

    setTempSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));

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

  const handleApplySettings = async (e: React.FormEvent) => {

    e.preventDefault();

    if (tempSettings) {
      setSystemSettings(tempSettings);
    }

    if (tempSettings.vertical_size !== settings.vertical_size || tempSettings.horizontal_size !== settings.horizontal_size) {
      resizeWindow(tempSettings.horizontal_size, tempSettings.vertical_size);
    }

    handlePage(PAGES.HOME);

  };

  return(
    <form onSubmit={handleApplySettings}>
      <div className="w-full  flex flex-col justify-center items-center p-2 mb-5 overflow-x-scroll " >

        <ContentSettings label={t("themes")} className="rounded-t-md border-width-selected py-3">

          <IoArrowForwardOutline className="w-5 h-5 text-gray-600 dark:text-gray-200  cursor-pointer  border-gray-200 dark:border-none hover:border-gray-400 rounded-md  ml-1.5 " onClick={() => handlePage(PAGES.THEME)} />

        </ContentSettings>

        {settingsConfig.map((cfg, idx) => (
          <ContentSettings label={t(cfg.key)} key={t(cfg.key)} className={"border-x-width-selected border-b-width-selected width-selected"}>
            <Dropdown
              options={cfg.items}
              onSelect={(value) => handleSelect(cfg.key as keyof SystemSettingsProps, value)}
              selectedValue={tempSettings[cfg.key as keyof SystemSettingsProps]}
              isOpen={openDropdown === idx}
              onToggle={() => handleDropdownToggle(idx)}
            />
          </ContentSettings>

        ))}

        <ContentSettings label={t("keyboard_shortcut")} className="border-x-width-selected border-b-width-selected ">
          <ShortcutInput
            value={settings.keyboard_shortcut}
            onChange={(combo) => handleShorcutChange(combo ?? "")}
            placeholder="Pulsa la combinación"
            setEditing={setIsEditing}
          />
        </ContentSettings>

        <ContentSettings label={t("search_shortcut")} className="border-x-width-selected border-b-width-selected ">
          <ShortcutInput
            value={settings.keyboard_shortcut}
            onChange={(combo) => handleShorcutChange(combo ?? "")}
            placeholder="Pulsa la combinación"
            setEditing={setIsEditing}
          />
        </ContentSettings>

        <ContentSettings label={t("delete_shortcut")} className="border-x-width-selected border-b-width-selected ">
          <ShortcutInput
            value={settings.keyboard_shortcut}
            onChange={(combo) => handleShorcutChange(combo ?? "")}
            placeholder="Pulsa la combinación"
            setEditing={setIsEditing}
          />
        </ContentSettings>
        <ContentSettings label={t("font_size")} className="border-x-width-selected border-b-width-selected ">

          <UnityInput
            unity="px"
            type="number"
            placeholder="12"
            value={parseInt(tempSettings.font_size,10)}
            min={6}
            max={20}
            onSelect={(value) =>handleSelect(fontSizeOptions.key as keyof SystemSettingsProps, value+"px" )}

          />
        </ContentSettings>

        <ContentSettings label={t("horizontal_size")} className="border-x-width-selected border-b-width-selected  ">

          <UnityInput
            unity="px"
            type="number"
            placeholder="12"
            value={tempSettings.horizontal_size}
            min={100}
            max={1000}
            onSelect={(value) =>handleSelect("horizontal_size" as keyof SystemSettingsProps, parseInt(value as string,10) )}

          />
        </ContentSettings>

        <ContentSettings label={t("vertical_size")} className="border-x-width-selected border-b-width-selected  rounded-b-md">

          <UnityInput
            unity="px"
            type="number"
            placeholder="12"
            value={tempSettings.vertical_size}
            min={100}
            max={1000}
            onSelect={(value) =>handleSelect("vertical_size" as keyof SystemSettingsProps, parseInt(value as string,10) )}

          />
        </ContentSettings>

        <input type="submit" value={t("apply")} className="mt-2 mb-6 bg-gray-200 dark:bg-secondary border-width-selected border-gray-300 dark:border-tertiary-dark hover:dark:border-tertiary text-dark dark:text-white font-light px-4 py-2 rounded-md cursor-pointer  transition-colors duration-100 disabled mr-auto"   />

      </div>
    </form>
  );
}
