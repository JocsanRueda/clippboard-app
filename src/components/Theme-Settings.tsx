import { DEFAULT_THEME_ID, PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { useThemeContext } from "@/context/Theme-Context";
import { ThemeFile } from "@/types/theme.type";
import { deleteTheme, getUserThemes } from "@/utils/store";
import { getThemes } from "@/utils/theme";
import { useEffect, useMemo, useState } from "react";
import { IoAddSharp, IoCheckmarkCircle } from "react-icons/io5";
import ThemePreview from "./Theme-Preview";

export function ThemeSettings() {

  const {handlePage}= usePageContext();

  const {themeId, setThemeId}= useThemeContext();
  const [userThemes, setUserThemes] = useState<ThemeFile[]>([]);
  const [allThemes, setAllThemes] = useState<ThemeFile[]>(getThemes());
  const [hoveredThemeIndex, setHoveredThemeIndex] = useState<number | null>(null);

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
    <div className="flex flex-col gap-2">
      <span className="mx-auto flex flex-row items-center gap-2">
        <h2 className="col-span-3 text-sm font-semibold dark:text-white">{ (hoveredThemeIndex !== null ? allThemes[hoveredThemeIndex]?.name : allThemes[themeIndex]?.name ?? "loading...")}</h2>
        <IoCheckmarkCircle className={` transition-[right] duration w-4.5 h-4.5 text-secondary-light ${ hoveredThemeIndex!==themeIndex  ?  "hidden":"display-block" }`} />
      </span>

      <div className="grid  grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9  place-items-center gap-2 mb-3">

        {allThemes.map((theme,index)=>{

          return <ThemePreview
            key={theme.id}
            primaryColor={theme.primaryColor}
            secondaryColor={theme.secondaryColor}
            fontSize={theme.fontSize}
            borderWidth={theme.borderWidth}
            tertiaryColor={theme.tertiaryColor}
            onClick={() => handleSelected(index)}
            selected={themeId === theme.id}
            userTheme={theme.userTheme}
            onDelete={() => handleDeleteTheme(theme.id)}
            onMouseEnter={() => setHoveredThemeIndex(index)}
            onMouseLeave={() => setHoveredThemeIndex(null)}
          />;
        })}

        <div className="bg-gray-200 border-gray-300 dark:bg-secondary w-10 h-10  flex  items-center justify-center rounded-md border-width-selected dark:border-primary-light" onClick={()=>handlePage(PAGES.NEW_THEME)} >
          <IoAddSharp className="w-5 h-5 text-gray-600 dark:text-white hover:scale-120 transition-scale duration-100" />
        </div>
      </div>

    </div>

  );
}

export default ThemeSettings;
