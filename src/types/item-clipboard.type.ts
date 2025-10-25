import { fileType } from "./file.type";

export type ItemClipboard = {
  type: fileType;
  value: string;
  path?: string ;
  fixed: boolean;
}
