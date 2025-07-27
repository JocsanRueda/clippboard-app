import { handleElement } from "./handle.type";
import { SquareTextProps } from "./square.type";

export type ContentCardProps = SquareTextProps & {

  toggleActions: handleElement;

  handleMenu: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleSave: (newText: string) => void;

}
