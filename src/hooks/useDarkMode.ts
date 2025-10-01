import { getCurrentTheme, toggleDarkMode } from "@/utils/theme";
import { useEffect } from "react";

export function useDarkMode(isDarkMode: boolean) {

  useEffect(() => {

    console.log("Dark mode changed:", getCurrentTheme());
    toggleDarkMode(isDarkMode);
  },[isDarkMode]);
}
