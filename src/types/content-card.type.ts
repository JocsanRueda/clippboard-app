import { fileType } from "./file.type";


export type ContentCardProps = BaseContentFileProps & {
  type: fileType;
  toggleActions: ItemActionMenu;
  handleMenu: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleSave: (newText: string) => void;
  handleFixed: () => void;

}
