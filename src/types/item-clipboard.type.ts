import { fileType } from "./file.type";

export type ItemClipboard = {
  id: string;
  type: fileType;
  value: string;
  path?: string ;
  fixed: boolean;
}
