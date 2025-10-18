import { fileType } from "./file.type";
/* eslint-disable no-unused-vars */
export type ContentRendererProps = {
  type: fileType
  text: string;
  url?: string;
  editText: boolean;
  setText: (newText: string) => void;
  handleCopy?: () => void;
};
