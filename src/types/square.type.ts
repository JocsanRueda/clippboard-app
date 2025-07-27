export type fileType = "text" | "image" | "audio" | "video" | "document";

export type SquareTextProps = {
  type: fileType;
  text: string;
  url?: string;
}

export type SquareTextComponentProps = SquareTextProps & {

  toggleMenu: boolean;
  toggleEdit: boolean;

  handleMenu: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleSave: (newText: string) => void;

}
