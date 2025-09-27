import { IoAddSharp } from "react-icons/io5";
import ThemePreview from "./Theme-Preview";
import { useState } from "react";
import { usePageContext } from "@/context/Page-Contex";
import { PAGES } from "@/constants/constant";
import themes from "@/themes/themes.json";
import { applyTheme } from "@/utils/theme-manager";
import { Theme } from "@/types/theme.type";

export function ThemeSettings() {

  const {handlePage}= usePageContext();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelected = (index: number) => {
    setSelectedIndex(index);

    const selectedTheme = themes.themes[index];

    const newTheme :Theme =  {
      primary: selectedTheme.primaryColor,
      secondary: selectedTheme.secondaryColor,
      borderWidth: selectedTheme.borderWidth,
      borderColor: selectedTheme.borderColor
    };

    applyTheme(newTheme);
  };

  return(
    <div className="grid grid-cols-3  place-items-center gap-2">
      <h2 className="col-span-3 text-sm font-semibold dark:text-white">{themes.themes[selectedIndex].name}</h2>
      {themes.themes.map((theme,index)=>{

        return <ThemePreview key={index} {...theme} onClick={() => handleSelected(index)} selected={selectedIndex === index} />;
      })

      }

      <div className="bg-gray-200 dark:bg-secondary w-10 h-10  flex  items-center justify-center rounded-md border-4 border-primary-light hover:border-gray-400" onClick={()=>handlePage(PAGES.NEW_THEME)} >
        <IoAddSharp className="w-5 h-5 text-gray-600 dark:text-white hover:scale-120 transition-scale duration-100" />
      </div>
    </div>
  );
}

export default ThemeSettings;
