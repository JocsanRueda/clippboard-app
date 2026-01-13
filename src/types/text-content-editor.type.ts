/* eslint-disable no-unused-vars */
export type TextContentEditorProps = {
  text: string;
  editText: boolean;
  newText?: string;
  setNewText: (newText: string) => void;
  handleCopy?: () => void;
};
