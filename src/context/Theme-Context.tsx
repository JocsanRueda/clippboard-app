import { DEFAULT_THEME_ID } from "@/constants/constant";
import { getLocalStorageTheme } from "@/utils/localStorage";
import { getThemeId, saveThemeId, } from "@/utils/store";
import { applyTheme, applyThemeById } from "@/utils/theme";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type themeContextValue={
  themeId:string,
  // eslint-disable-next-line no-unused-vars
  setThemeId:(id:string)=>void;
}

const ThemeContext= createContext<themeContextValue | null>({
  themeId:DEFAULT_THEME_ID,
  setThemeId:()=>{}
});

export const ThemeProvider:React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [themeId, setThemeId]= useState<string>(DEFAULT_THEME_ID);

  useEffect(()=>{

    const loadTheme=async()=>{
      const themeStorage = getLocalStorageTheme();
      if (themeStorage) {
        setThemeId(themeStorage.id);
        applyTheme(themeStorage);
        return;
      }

      const themeId= await getThemeId();
      setThemeId(themeId);
      await applyThemeById(themeId);
    };

    loadTheme();

  },[]);

  const setThemeIdWrapper= useCallback(async (id:string)=>{

    if (id === themeId) return;

    await applyThemeById(id);

    setThemeId(id);

    try{
      await saveThemeId(id);
    }catch (error) {
      console.error("Error saving settings:", error);
    }
  },[themeId]);

  const value=useMemo(
    ()=>({
      themeId,setThemeId:setThemeIdWrapper
    }),[themeId,setThemeIdWrapper]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useThemeContext() {
  const ctx= useContext(ThemeContext);
  if(!ctx) throw new Error("useThemeContext must be used within a ThemeProvider");
  return ctx;
}
