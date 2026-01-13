import { fileType } from "./file.type";
/* eslint-disable no-unused-vars */
export type ContentRendererProps = {
  type: fileType
  text: string;
  newText?: string;
  url?: string;
  editText: boolean;
  setNewText: (newText: string) => void;
  handleCopy?: () => void;
};
