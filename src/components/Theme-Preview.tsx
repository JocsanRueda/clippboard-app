import { ThemePreviewProps } from "@/types/theme-preview.type";
import { isDark } from "@/utils/theme";

import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosRemoveCircle } from "react-icons/io";
export function ThemePreview({
  primaryColor ,
  secondaryColor ,
  fontSize ,
  borderWidth ,
  tertiaryColor,
  selected = false,
  onClick,
  userTheme,
  onDelete,
}: ThemePreviewProps) {
  const [hovered, setHovered] = React.useState(false);
  const containerStyle: React.CSSProperties = {
    backgroundColor: isDark() ? primaryColor : "var(--color-default-primary-light)",

    fontSize,
  };

  const previewStyle: React.CSSProperties = {
    backgroundColor: secondaryColor,
    borderColor: tertiaryColor,
    borderWidth: borderWidth,
    borderStyle: "solid",
  };

  return (
    <div className={"px-3 py-4 relative rounded-md  border-4 duration-100  bg-gray-200  hover:border-primary-light border-primary dark:border-primary-dark"} style={containerStyle} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      <IoCheckmarkCircle className={`absolute transition-[right] duration top-0 right-0 w-4.5 h-4.5 text-secondary-light ${selected ? "display-block" : "hidden"}`} />
      { userTheme && <IoIosRemoveCircle className={`absolute -top-2.5 -right-1 w-7 h-7 text-gray-400 dark:text-white hover:text-red-500 transition-colors rounded-full  ${hovered ? "display-block" : "hidden"}`} onClick={onDelete} /> }
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-1 items-center">
          <div className={"h-4 w-10 rounded-sm bg-gray-300 "} style={previewStyle} />
          <div className={"h-4 w-3.5 rounded-sm bg-gray-300 "} style={previewStyle} />
          <div className={"h-4 w-3.5 rounded-sm bg-gray-300 "} style={previewStyle} />
          <div className={"h-4 w-3.5 rounded-sm bg-gray-300 "} style={previewStyle} />
        </div>
      </div>

      {/* List of cards */}
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={"h-4.5 w-full rounded-sm bg-gray-100 "} style={previewStyle}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemePreview;
