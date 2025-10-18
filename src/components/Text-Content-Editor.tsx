import { TextContentEditorProps } from "@/types/text-content-editor.type";
import { MAX_TEXT_LENGTH } from "@/constants/constant";
import { truncateString } from "@/utils/string";

export function TextContentEditor({ text, editText, setText, handleCopy}: TextContentEditorProps) {
  if (editText) {
    return (
      <textarea
        className="w-full h-28 p-2 rounded-md  border-width-min-selected border-gray-300 focus-within:border-gray-400  dark:focus-within:border-tertiary dark:border-tertiary-dark dark:bg-primary text-gray-900 dark:text-quaternary text-base font-light tracking-tight break-words focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={50 * MAX_TEXT_LENGTH}
      />
    );
  } else {
    return (
      <p
        className="text-gray-950 dark:text-white text-base font-light tracking-tight break-all" onClick={handleCopy}
      >
        {truncateString(text, MAX_TEXT_LENGTH)}
      </p>
    );
  }
}

export default TextContentEditor;

