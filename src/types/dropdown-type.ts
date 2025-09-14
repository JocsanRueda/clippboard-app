/* eslint-disable no-unused-vars */

export type DropdownProps ={
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  defaultValue?: number;
  isOpen: boolean;
  onToggle: () => void;
}
