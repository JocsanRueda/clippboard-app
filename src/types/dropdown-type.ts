/* eslint-disable no-unused-vars */

export type DropdownProps ={
  options: { label: string; value: string | number | boolean }[];
  selectedValue: string | number | boolean | undefined;
  onSelect: (value: string | number | boolean) => void;
  isOpen: boolean;
  onToggle: () => void;
}
