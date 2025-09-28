export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  borderWidth: string;
  fontColor?: string;
  fontSize?: string;

};

export type ThemeFile = Theme & {
  name: string;
}

export type ThemesFileJson = {
  themes: ThemeFile[];

}
