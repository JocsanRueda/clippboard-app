import { toggleDarkMode } from "@/utils/theme";
import { useEffect } from "react";

export function useDarkMode(isDarkMode: boolean) {

  useEffect(() => {

    toggleDarkMode(isDarkMode);
  },[isDarkMode]);
}
