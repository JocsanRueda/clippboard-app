import { THEME } from "@/constants/constant";

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
