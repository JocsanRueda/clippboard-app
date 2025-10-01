import { Theme, ThemeFile } from "@/types/theme.type";

export function saveLocalStorageTheme(theme: Theme) {
  // eslint-disable-next-line no-undef
  localStorage.setItem("theme", JSON.stringify(theme));
}

export function getLocalStorageTheme(): ThemeFile | null {
  // eslint-disable-next-line no-undef
  const theme = localStorage.getItem("theme");
  if (theme) {
    try {
      const parsedTheme = JSON.parse(theme);
      return parsedTheme;
    } catch (error) {
      console.error("Error parsing theme from localStorage:", error);
      return null;
    }
  }
  return null;
}
