import { fileType } from "./file.type";

export type ItemClipboard = {
  type: fileType;
  text: string;
  url?: string;
  fixed: boolean;
}
