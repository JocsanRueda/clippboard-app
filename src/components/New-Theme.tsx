import { DEFAULT_THEME_INDEX, MAX_LENGTH_THEME_NAME } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { useResetScroll } from "@/hooks/useResetScroll";
import { ThemePreviewProps } from "@/types/theme-preview.type";
import { ThemeFile } from "@/types/theme.type";
import { addTheme } from "@/utils/store";
import { applyTheme, getThemes } from "@/utils/theme";
import React, { useState } from "react";
import ContentSettings from "./Content-Settings";
import ThemePreview from "./Theme-Preview";
import Dropdown from "./UI-Components/Dropdown";
import { useTranslation } from "react-i18next";
import { Button } from "./UI-Components/Button";

export function NewTheme() {

  const [themeName, setThemeName] = useState<string>("");
  const {goBack}= usePageContext();

  const [theme, setTheme] = useState<ThemePreviewProps>(getThemes()[DEFAULT_THEME_INDEX]);
  const { t } = useTranslation();

  useResetScroll();

  const handleThemeChange = (property: keyof ThemePreviewProps, value: string | number | boolean) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      [property]: value,
    }));
  };

  const borderWidthOptions=[
    { label: "1 px", value: "1px" },
    { label: "2 px", value: "2px" },
    { label: "3 px", value: "3px" },
    { label: "4 px", value: "4px" },
    { label: "5 px", value: "5px" },

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
      fontColor: theme.fontColor || "#000000",
      name: themeName,
      userTheme: true
    };

    applyTheme(newTheme);
    await addTheme(newTheme);
    goBack();
  };

  return(
    <form className=" w-full flex flex-col justify-center items-center px-2  " onSubmit={handleSubmit}>

      <ThemePreview primaryColor={theme.primaryColor} secondaryColor={theme.secondaryColor}  fontSize={theme.fontSize}  borderWidth={theme.borderWidth} tertiaryColor={theme.tertiaryColor} />

      <ContentSettings label={t("name")} className="rounded-t-md border-width-selected py-3 mt-2">

        <input
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          maxLength={MAX_LENGTH_THEME_NAME}
          type="text"
          placeholder={t("name_your_theme")}
          className= "  dark:bg-primary focus:outline-none  border-width-min-selected border-gray-400 focus-within:border-gray-500 dark:border-tertiary-dark dark:focus-within:border-tertiary  rounded-md py-2 px-2 text-black dark:text-quaternary transition-[width,opacity] duration-100 w-full max-w-90" required

        />
      </ContentSettings>

      <ContentSettings label={t("primary_color")} className="border-x-width-selected border-b-width-selected py-3">

        <input type="color" className="w-7 h-7 outline-none  border-width-min-selected cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.primaryColor }} onChange={(e) => handleThemeChange("primaryColor", e.target.value)} value={theme.primaryColor} />
      </ContentSettings>
      <ContentSettings label={t("secondary_color")} className="border-x-width-selected border-b-width-selected py-3">

        <input type="color" className="w-7 h-7 outline-none  border-width-min-selected cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.secondaryColor }} onChange={(e) => handleThemeChange("secondaryColor", e.target.value)} value={theme.secondaryColor} />

      </ContentSettings>
      <ContentSettings label={t("border_color")} className="border-x-width-selected border-b-width-selected py-3">

        <input type="color" className="w-7 h-7 outline-none  border-width-min-selected cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.tertiaryColor }} onChange={(e) => handleThemeChange("tertiaryColor", e.target.value)} value={theme.tertiaryColor} />

      </ContentSettings>
      {/* <ContentSettings label={t("font_color")} className="border-x-width-selected border-b-width-selected py-3">

        <input type="color" className="w-7 h-7 outline-none  border-width-min-selected cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.fontColor }} onChange={(e) => handleThemeChange("fontColor", e.target.value)} value={theme.fontColor} />

      </ContentSettings> */}
      <ContentSettings label={t("border_width")} className="border-x-width-selected border-b-width-selected rounded-b-md">

        <Dropdown options={borderWidthOptions} onSelect={(value) => handleThemeChange("borderWidth", value)}  isOpen={openDropdown === 0} selectedValue={theme.borderWidth} onToggle={() => handleDropdownToggle(0)} dropUp={true} />

      </ContentSettings>

      <Button label={t("save")} type="submit" />

    </form>
  );
}
