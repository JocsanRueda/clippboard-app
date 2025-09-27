
type Theme = {
  primary: string;
  secondary: string;
  borderWidth: string;
  borderColor: string;

};

export function applyTheme({ primary, secondary, borderWidth, borderColor }: Theme) {

  const root = document.documentElement;
  root.style.setProperty("--color-primary", primary);
  root.style.setProperty("--color-secondary", secondary);
  root.style.setProperty("--color-tertiary", borderColor);
  root.style.setProperty("--border-width", borderWidth);

}

export function resetTheme() {

  const root = document.documentElement;
  root.style.removeProperty("--color-primary");
  root.style.removeProperty("--color-secondary");
  root.style.removeProperty("--border-width");
  root.style.removeProperty("--border-color");
  root.style.removeProperty("--font-type");

}
