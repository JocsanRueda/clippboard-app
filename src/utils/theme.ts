import { THEME } from "@/constants/constant";
import { Theme, ThemesFileJson } from "@/types/theme.type";
import themesJson from "../themes/themes.json";

export function applyTheme({ primaryColor, secondaryColor, borderWidth, tertiaryColor }: Theme) {

  const root = document.documentElement;
  root.style.setProperty("--color-primary", primaryColor);
  root.style.setProperty("--color-secondary", secondaryColor);
  root.style.setProperty("--color-tertiary", tertiaryColor);
  root.style.setProperty("--border-width", borderWidth);

}

export function resetTheme() {

  const root = document.documentElement;
  root.style.removeProperty("--color-primary");
  root.style.removeProperty("--color-secondary");
  root.style.removeProperty("--border-width");
  root.style.removeProperty("--color-tertiary");
  root.style.removeProperty("--font-type");

}

export function getCurrentTheme() {
  const root = document.documentElement;
  return root.classList.contains(THEME.DARK) ? THEME.DARK : THEME.LIGHT;
}

export function isDark() {
  return getCurrentTheme() === THEME.DARK;
}

export function isLight() {
  return getCurrentTheme() === THEME.LIGHT;
}

export function getThemes(){
  const themes  = themesJson as ThemesFileJson;
  return themes.themes;
}

export async function applyThemeByIndex(index: number){
  const themes  = getThemes();
  if(index < 0 || index >= themes.length) return;
  applyTheme(themes[index]);

}
