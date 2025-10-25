import { fileType } from "./file.type";
/* eslint-disable no-unused-vars */
export type ContentRendererProps = {
  type: fileType
  value: string;
  url?: string;
  editText: boolean;
  setText: (newText: string) => void;
  handleCopy?: () => void;
};
