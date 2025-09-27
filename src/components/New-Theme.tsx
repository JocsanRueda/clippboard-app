import { useState } from "react";
import ContentSettings from "./Content-Settings";
import ThemePreview from "./Theme-Preview";
import Dropdown from "./UI-Components/Dropdown";
import { ThemePreviewProps } from "@/types/theme-preview.type";
import { Theme } from "@/types/theme.type";

import { applyTheme } from "@/utils/theme-manager";

export function NewTheme() {

  const [theme, setTheme] = useState<ThemePreviewProps>({
    primaryColor: "#ffffff",
    secondaryColor: "#f3f4f6",
    fontSize: "14px",
    borderWidth: "2px",
    borderColor: "#d1d5db",
    tailwindConfig: false,
    selected: false,
  });

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

  const handleTheme = () => {

    const newTheme : Theme = {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
    };

    applyTheme(newTheme);

  };

  return(
    <div className="w-full max-w-md flex flex-col justify-center items-center px-2">

      <ThemePreview primaryColor={theme.primaryColor} tailwindConfig={theme.tailwindConfig} fontSize={theme.fontSize}  borderWidth={theme.borderWidth} borderColor={theme.borderColor} secondaryColor={theme.secondaryColor} />

      <ContentSettings label="Primary Color" className="rounded-t-md border-3 py-3 mt-2">

        <input type="color" className="w-7 h-7  border-3 cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.primaryColor }} onChange={(e) => handleThemeChange("primaryColor", e.target.value)} value={theme.primaryColor} />
      </ContentSettings>
      <ContentSettings label="Secondary Color" className="border-x-3 border-b-3 py-3">

        <input type="color" className="w-7 h-7  border-3 cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.secondaryColor }} onChange={(e) => handleThemeChange("secondaryColor", e.target.value)} value={theme.secondaryColor} />

      </ContentSettings>
      <ContentSettings label="Border-color" className="border-x-3 border-b-3 py-3">

        <input type="color" className="w-7 h-7  border-3 cursor-pointer rounded-md  border-gray-400" style={{ backgroundColor: theme.borderColor }} onChange={(e) => handleThemeChange("borderColor", e.target.value)} value={theme.borderColor} />

      </ContentSettings>
      <ContentSettings label="Border-width" className="border-x-3 border-b-3">

        <Dropdown options={borderWidthOptions} onSelect={(value) => handleThemeChange("borderWidth", value)}  isOpen={openDropdown === 0} selectedValue={theme.borderWidth} onToggle={() => handleDropdownToggle(0)} />

      </ContentSettings>

      <ContentSettings label="Font-size" className="rounded-b-md border-x-3 border-b-3">
        <Dropdown options={fontSizeOptions} onSelect={(value) => handleThemeChange("fontSize", value)} isOpen={openDropdown === 1} selectedValue={theme.fontSize} onToggle={() => handleDropdownToggle(1)} />
      </ContentSettings>

      <input type="button" value="Save Theme" className="mt-4 mb-6 bg-gray-200 text-dark font-light px-4 py-2 rounded-md cursor-pointer hover:bg-gray-300 transition-colors duration-100 border-3 border-gray-200 hover:border-gray-400" onClick={handleTheme} />

    </div>
  );
}
