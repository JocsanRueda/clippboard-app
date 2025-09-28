import { DEFAULT_THEME_INDEX } from "@/constants/constant";
import { getThemeIndex, saveThemeIndex } from "@/utils/store";
import { applyThemeByIndex } from "@/utils/theme";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type themeContextValue={
  themeIndex:number,
  // eslint-disable-next-line no-unused-vars
  setThemeIndex:(index:number)=>void;
}

const ThemeContext= createContext<themeContextValue | null>({
  themeIndex:DEFAULT_THEME_INDEX,
  setThemeIndex:()=>{}
});

export const ThemeProvider:React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [themeIndex, setThemeIndex]= useState<number>(DEFAULT_THEME_INDEX);

  useEffect(()=>{

    const loadTheme=async()=>{
      const themeIndex= await getThemeIndex();
      setThemeIndex(themeIndex);
      applyThemeByIndex(themeIndex);
    };
    loadTheme();

  },[]);

  const setThemeIndexWrapper= useCallback(async (index:number)=>{
    setThemeIndex(index);
    applyThemeByIndex(index);

    try{
      await saveThemeIndex(index);
    }catch (error) {
      console.error("Error saving settings:", error);
    }
  },[]);

  const value=useMemo(
    ()=>({
      themeIndex,setThemeIndex:setThemeIndexWrapper
    }),[themeIndex,setThemeIndexWrapper]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useThemeContext() {
  const ctx= useContext(ThemeContext);
  if(!ctx) throw new Error("useThemeContext must be used within a ThemeProvider");
  return ctx;
}
