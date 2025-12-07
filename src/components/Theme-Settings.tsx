import { DEFAULT_THEME_ID, PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { useThemeContext } from "@/context/Theme-Context";
import { ThemeFile } from "@/types/theme.type";
import { deleteTheme, getUserThemes } from "@/utils/store";
import { getThemes } from "@/utils/theme";
import { useEffect, useMemo, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import ThemePreview from "./Theme-Preview";

export function ThemeSettings() {

  const {handlePage}= usePageContext();

  const {themeId, setThemeId}= useThemeContext();
  const [userThemes, setUserThemes] = useState<ThemeFile[]>([]);
  const [allThemes, setAllThemes] = useState<ThemeFile[]>(getThemes());
  const [hoveredThemeId, setHoveredThemeId] = useState<number | null>(null);

  // load user themes from store
  useEffect(()=>{
    const loadUserThemes=async()=>{
      const themes= await getUserThemes();

      if (themes.length === 0) return;
      setUserThemes(themes);
    };
    loadUserThemes();
  },[]);

  // update all themes when user themes change
  useEffect(() => {
    let themes = [...getThemes(), ...userThemes];

    setAllThemes(themes);
  }, [userThemes, themeId]);

  const handleSelected = (index: number) => {
    if (allThemes[index]) setThemeId(allThemes[index].id);
  };

  const themeIndex = useMemo(
    () => allThemes.findIndex(t => t.id === themeId),
    [allThemes, themeId]
  );

  const handleDeleteTheme= async(newThemeId:string)=>{

    if (newThemeId ===themeId) setThemeId(DEFAULT_THEME_ID);

    await deleteTheme(newThemeId);
    setUserThemes(prev => prev.filter(t => t.id !== newThemeId));

  };

  return(
    <div className="grid grid-cols-3  place-items-center gap-2 mb-3">
      <h2 className="col-span-3 text-sm font-semibold dark:text-white fixed z-10 left-1/2 -translate-x-1/2 ">{ (hoveredThemeId !== null ? allThemes[hoveredThemeId]?.name : allThemes[themeIndex]?.name ?? "loading...")}</h2>
      {allThemes.map((theme,index)=>{

        return <ThemePreview
          key={index}
          primaryColor={theme.primaryColor}
          secondaryColor={theme.secondaryColor}
          fontSize={theme.fontSize}
          borderWidth={theme.borderWidth}
          tertiaryColor={theme.tertiaryColor}
          onClick={() => handleSelected(index)}
          selected={themeId === theme.id}
          userTheme={theme.userTheme}
          onDelete={() => handleDeleteTheme(theme.id)}
          onMouseEnter={() => setHoveredThemeId(index)}
          onMouseLeave={() => setHoveredThemeId(null)}
        />;
      })}

      <div className="bg-gray-200 border-gray-300 dark:bg-secondary w-10 h-10  flex  items-center justify-center rounded-md border-width-selected dark:border-primary-light" onClick={()=>handlePage(PAGES.NEW_THEME)} >
        <IoAddSharp className="w-5 h-5 text-gray-600 dark:text-white hover:scale-120 transition-scale duration-100" />
      </div>
    </div>
  );
}

export default ThemeSettings;
