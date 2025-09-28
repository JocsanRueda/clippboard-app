import { PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { useThemeContext } from "@/context/Theme-Context";
import { getThemes } from "@/utils/theme";
import { IoAddSharp } from "react-icons/io5";
import ThemePreview from "./Theme-Preview";

export function ThemeSettings() {

  const {handlePage}= usePageContext();

  const {themeIndex, setThemeIndex}= useThemeContext();

  const themes = getThemes();

  const handleSelected = (index: number) => {
    setThemeIndex(index);

  };

  return(
    <div className="grid grid-cols-3  place-items-center gap-2">
      <h2 className="col-span-3 text-sm font-semibold dark:text-white">{themes[themeIndex].name}</h2>
      {themes.map((theme,index)=>{

        return <ThemePreview
          key={index}
          primaryColor={theme.primaryColor}
          secondaryColor={theme.secondaryColor}
          fontSize={theme.fontSize}
          borderWidth={theme.borderWidth}
          tertiaryColor={theme.tertiaryColor}
          onClick={() => handleSelected(index)}
          selected={themeIndex === index}
        />;
      })}

      <div className="bg-gray-200 dark:bg-secondary w-10 h-10  flex  items-center justify-center rounded-md border-width-selected border-primary-light hover:border-gray-400" onClick={()=>handlePage(PAGES.NEW_THEME)} >
        <IoAddSharp className="w-5 h-5 text-gray-600 dark:text-white hover:scale-120 transition-scale duration-100" />
      </div>
    </div>
  );
}

export default ThemeSettings;
