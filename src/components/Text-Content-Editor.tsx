import { TextContentEditorProps } from "@/types/text-content-editor.type";
import { MAX_TEXT_LENGTH } from "@/constants/constant";
import { truncateString } from "@/utils/string";

export function TextContentEditor({ text, editText, setText }: TextContentEditorProps) {
  if (editText) {
    return (
      <textarea
        className="w-full h-28 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-primary text-gray-900 dark:text-quaternary text-base font-light tracking-tight break-words"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={50 * MAX_TEXT_LENGTH}
      />
    );
  } else {
    return (
      <p
        className="text-gray-900 dark:text-white text-base font-light tracking-tight break-all"
      >
        {truncateString(text, MAX_TEXT_LENGTH)}
      </p>
    );
  }
}

export default TextContentEditor;

