import { fileType } from "./file.type";

export type ContentRendererProps = {
  type: fileType
  text: string;
  url?: string;
  editText: boolean;
  setText: (newText: string) => void;
};