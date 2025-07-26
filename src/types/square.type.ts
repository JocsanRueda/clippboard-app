export type fileType = "text" | "image" | "audio" | "video" | "document";

export type SquareTextProps = {
  type: fileType;
  text: string;
  url?: string;
}
