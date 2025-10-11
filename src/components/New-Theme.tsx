import { DEFAULT_THEME_INDEX, MAX_LENGTH_THEME_NAME } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { ThemePreviewProps } from "@/types/theme-preview.type";
import { ThemeFile } from "@/types/theme.type";
import { addTheme } from "@/utils/store";
import { applyTheme, getThemes } from "@/utils/theme";
import React, { useState } from "react";
import ContentSettings from "./Content-Settings";
import ThemePreview from "./Theme-Preview";
import Dropdown from "./UI-Components/Dropdown";
import { useResetScroll } from "@/hooks/useResetScroll";

export function NewTheme() {

  const [themeName, setThemeName] = useState<string>("");
  const {goBack}= usePageContext();

  const [theme, setTheme] = useState<ThemePreviewProps>(getThemes()[DEFAULT_THEME_INDEX]);
  useResetScroll();

  const handleThemeChange = (property: keyof ThemePreviewProps, value: string | number) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      [property]: value,
    }));
  };

  const borderWidthOptions=[
    { label: "1px", value: "1px" },
    { label: "2px", value: "2px" },
    { label: "3px", value: "3px" },
    { label: "4px", value: "4px" },
    { label: "5px", value: "5px" },

  ];

  const fontSizeOptions=[
    { label: "12px", value: "12px" },
    { label: "14px", value: "14px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "20px", value: "20px" },

  ];

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (dropdownId: number) => {
    setOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTheme : ThemeFile = {

      // eslint-disable-next-line no-undef
      id: crypto.randomUUID(),
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      borderWidth: theme.borderWidth,
      tertiaryColor: theme.tertiaryColor,
      name: themeName,
      userTheme: true
    };

    applyTheme(newTheme);
    await addTheme(newTheme);
    goBack();
  };

  return(
    <form className=" w-full max-w-md flex flex-col justify-center items-center px-2 overflow-x-scroll  " onSubmit={handleSubmit}>

      <ThemePreview primaryColor={theme.primaryColor} secondaryColor={theme.secondaryColor}  fontSize={theme.fontSize}  borderWidth={theme.borderWidth} tertiaryColor={theme.tertiaryColor} />

      <ContentSettings label="Theme Name" className="rounded-t-md border-width-selected py-3 mt-2">

        <input
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          maxLength={MAX_LENGTH_THEME_NAME}
          type="text"
          placeholder=" Name your theme"
          className="dark:bg-primary  focus:outline-none  border-width-min-selected border-gray-400 focus-within:border-gray-500 dark:border-tertiary-dark dark:focus-within:border-tertiary  rounded-md p-1 text-black dark:text-quaternary transition-[width,opacity] duration-100" required

        />
      </ContentSettings>

      <ContentSettings label="Secondary Color" className="border-x-width-selected border-b-width-selected py-3">

        <input type="color" className="w-7 h-7 outline-none  border-width-min-selected cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.primaryColor }} onChange={(e) => handleThemeChange("primaryColor", e.target.value)} value={theme.primaryColor} />
      </ContentSettings>
      <ContentSettings label="Secondary Color" className="border-x-width-selected border-b-width-selected py-3">

        <input type="color" className="w-7 h-7 outline-none  border-width-min-selected cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.secondaryColor }} onChange={(e) => handleThemeChange("secondaryColor", e.target.value)} value={theme.secondaryColor} />

      </ContentSettings>
      <ContentSettings label="Border-color" className="border-x-width-selected border-b-width-selected py-3">

        <input type="color" className="w-7 h-7 outline-none  border-width-min-selected cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.tertiaryColor }} onChange={(e) => handleThemeChange("tertiaryColor", e.target.value)} value={theme.tertiaryColor} />

      </ContentSettings>
      <ContentSettings label="Border-width" className="border-x-width-selected border-b-width-selected">

        <Dropdown options={borderWidthOptions} onSelect={(value) => handleThemeChange("borderWidth", value)}  isOpen={openDropdown === 0} selectedValue={theme.borderWidth} onToggle={() => handleDropdownToggle(0)} />

      </ContentSettings>

      <ContentSettings label="Font-size" className="rounded-b-md border-x-width-selected border-b-width-selected">
        <Dropdown options={fontSizeOptions} onSelect={(value) => handleThemeChange("fontSize", value)} isOpen={openDropdown === 1} selectedValue={theme.fontSize} onToggle={() => handleDropdownToggle(1)} />
      </ContentSettings>

      <input type="submit" value="Save Theme" className="mt-4 mb-6 bg-gray-200 dark:bg-secondary border-width-selected border-gray-300 dark:border-tertiary-dark hover:dark:border-tertiary   text-dark dark:text-white font-light px-4 py-2 rounded-md cursor-pointer  transition-colors duration-100 disabled "  />

    </form>
  );
}
