import { offShortcuts, onShortcuts } from "@/api/tauri/clipboard";
import { resizeWindow } from "@/api/tauri/windows";
import { PAGES } from "@/constants/constant";
import {
  CATEGORY_SYSTEM_SETTINGS,
  deleteAllShortcutOptions,
  DropdownSettings,
  fontSizeOptions,
  searchShorcutOptions,
  sortShortcutOptions,
  TYPE_CONTROL_SETTINGS,
  UnityInputSettings
} from "@/constants/sytem-options";
import { usePageContext } from "@/context/Page-Contex";
import { useSystemSettingsContext } from "@/context/System-Settings-Context";
import { SystemSettings as SystemSettingsProps } from "@/types/system-settings.type";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentSettings from "./Content-Settings";
import { Button } from "./UI-Components/Button";
import Dropdown from "./UI-Components/Dropdown";
import ShortcutInput from "./UI-Components/Shorcut-input";
import { UnityInput } from "./UI-Components/Unitiy-input";
export function SystemSettings(){

  const {handlePage}= usePageContext();

  const [openDropdown, setOpenDropdown] = useState<{index: number, key: string}>({
    index: -1,
    key: "",
  });

  const [isEditing, setIsEditing]= useState<boolean>(false);

  const {settings, setSystemSettings} = useSystemSettingsContext();

  const [tempSettings, setTempSettings]= useState<SystemSettingsProps>(settings);

  const shorcutsRef= useRef<string>(settings.keyboard_shortcut);
  const shorcutsSearchRef= useRef<string>(settings.search_shortcut);
  const shorcutsDeleteRef= useRef<string>(settings.delete_all_shortcut);
  const shortcutsSortRef= useRef<string>(settings.sort_shortcut);

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

  const handleDropdownToggle = (dropdownId: number  , key: string) => {
    setOpenDropdown((prev) => (prev.index === dropdownId && prev.key === key ? {index: -1, key: ""} : {index: dropdownId, key}));
  };

  const handleSelect = async (key: keyof SystemSettingsProps, value: string | number | boolean) => {

    setTempSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));

  };

  const handleShorcutChange = async (combo: string, key: string) => {
    handleSelect(key as keyof SystemSettingsProps, combo);
    if (key ===  sortShortcutOptions.key) {
      shorcutsRef.current = combo;
    } else if (key === searchShorcutOptions.key) {
      shorcutsSearchRef.current = combo;
    } else if (key === deleteAllShortcutOptions.key) {
      shorcutsDeleteRef.current = combo;
    } else{
      shortcutsSortRef.current = combo;
    }
  };

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

        {/* settings items */}

        {CATEGORY_SYSTEM_SETTINGS.GeneralSettings.map((cfg, idx) => (
          <ContentSettings label={t(cfg.key)} key={t(cfg.key)} firstItem={idx==0} lastItem={idx==CATEGORY_SYSTEM_SETTINGS.GeneralSettings.length-1}>

            <Dropdown
              options={cfg.items}
              onSelect={(value) => handleSelect(cfg.key as keyof SystemSettingsProps, value)}
              selectedValue={tempSettings[cfg.key as keyof SystemSettingsProps]}
              isOpen={openDropdown.index === idx && openDropdown.key === cfg.key}
              onToggle={() => handleDropdownToggle(idx, cfg.key)}
            />

          </ContentSettings>

        ))}

        {/* aparent settings */}

        {CATEGORY_SYSTEM_SETTINGS.AppearanceSettings.map((cfg, idx) => {

          const cfgUnity= cfg as UnityInputSettings;

          const cfgDropdown= cfg as DropdownSettings;

          return(

            <ContentSettings label={t(cfg.key)} key={t(cfg.key)} firstItem={idx==0} lastItem={idx==CATEGORY_SYSTEM_SETTINGS.AppearanceSettings.length-1}>
              {cfg.type === TYPE_CONTROL_SETTINGS.UNITY_INPUT && (

                <UnityInput
                  unity={cfgUnity.unity}
                  type={cfgUnity.typeValue}
                  placeholder={cfgUnity.placeholder}
                  value={parseInt(tempSettings.font_size,10)}
                  min={cfgUnity.min}
                  max={cfgUnity.max}
                  onSelect={(value) =>handleSelect(fontSizeOptions.key as keyof SystemSettingsProps, value+cfgUnity.unity )}

                />
              )}

              {cfg.type === TYPE_CONTROL_SETTINGS.DROPDOWN && (
                <Dropdown
                  options={cfgDropdown.items}
                  onSelect={(value) => handleSelect(cfgDropdown.key as keyof SystemSettingsProps, value)}
                  selectedValue={tempSettings[cfgDropdown.key as keyof SystemSettingsProps]}
                  isOpen={openDropdown.index === idx && openDropdown.key === cfgDropdown.key}
                  onToggle={() => handleDropdownToggle(idx, cfgDropdown.key)}
                />

              )}

            </ContentSettings>
          );
        })}

        {/* size settings */}

        {CATEGORY_SYSTEM_SETTINGS.KeyboardSettings.map((cfg, idx) => {

          return(

            <ContentSettings label={t(cfg.key)} key={t(cfg.key)} firstItem={idx==0} lastItem={idx==CATEGORY_SYSTEM_SETTINGS.KeyboardSettings.length-1}>
              <ShortcutInput
                value={settings.sort_shortcut}
                onChange={(combo) => handleShorcutChange(combo ?? "", cfg.key)}
                placeholder={t(cfg.placeholder)}
                setEditing={setIsEditing}
              />
            </ContentSettings>
          );
        })}

        <Button label={t("apply")} type="submit" />

      </div>

    </form>
  );
}
