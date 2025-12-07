export type ThemePreviewProps = {
  primaryColor: string;
  secondaryColor: string;
  fontSize?: string;
  borderWidth: string;
  tertiaryColor: string;
  selected?: boolean;
  userTheme?: boolean;
  onDelete?: () => void;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};
