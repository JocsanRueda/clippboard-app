export type ActionMenuProps = {
  toggleMenu: boolean;
  handleDelete: () => void;
  disabledEdit?: boolean;
  editText?: boolean;
  handleEdit: () => void;
  handleSave: () => void;
};
