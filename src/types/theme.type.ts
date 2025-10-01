export type Theme = {
  id: string;
  name?: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  borderWidth: string;
  fontColor?: string;
  fontSize?: string;
};

export type ThemeFile = Theme & {
  name: string;
  userTheme?: boolean;
}

export type ThemesFileJson = {
  themes: ThemeFile[];

}

export type ThemeConfig={
  themeIndex:number
  darkMode:boolean
}
