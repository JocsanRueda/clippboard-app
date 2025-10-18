import { BaseContentFileProps } from "./base-content-file.type";
import { fileType } from "./file.type";
import { ItemActionMenu } from "./item-action-menu.type";
/* eslint-disable no-unused-vars */
export type ContentCardProps = BaseContentFileProps & {
  type: fileType;
  toggleActions: ItemActionMenu;
  handleMenu: () => void;
  handleDelete: () => void;
  handleEdit: () => void;
  handleSave: (newText: string) => void;
  handleFixed: () => void;
  handleCopy: () => void;

}
