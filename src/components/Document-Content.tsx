import { DocumentContentProps } from "@/types/document-content.type";
import { HiDocumentText } from "react-icons/hi2";

function DocumentContent({text, url}: DocumentContentProps  ) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center space-x-2 max-w-full my-3 px-2 py-1 rounded-md shadow-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="truncate text-gray-900 dark:text-white text-base font-light tracking-tight p-1">
        <HiDocumentText className="inline mr-1 text-6xl" />
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">{text}</span>
    </a>
  );
}

export default DocumentContent;
