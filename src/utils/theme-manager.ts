
export function applyTheme(theme: Record<string, string>) {
  Object.entries(theme).forEach(([key, value]) => {

    console.log(`Setting theme variable --${key} to ${value}`);
    document.documentElement.style.setProperty(`--${key}`, value);
  });
}

