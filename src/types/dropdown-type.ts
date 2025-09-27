/* eslint-disable no-unused-vars */

export type DropdownProps ={
  options: { label: string; value: string | number }[];
  selectedValue: string | number | undefined;
  onSelect: (value: string | number) => void;
  isOpen: boolean;
  onToggle: () => void;
}
