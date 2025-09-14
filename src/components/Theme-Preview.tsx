import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { ThemePreviewProps } from "@/types/theme-preview.type";
export function ThemePreview({
  primaryColor ,
  secondaryColor ,
  fontSize ,
  fontWeight ,
  borderWidth ,
  borderColor,
  tailwindConfig=false,
  selected = false,
  onClick,
}: ThemePreviewProps) {

  const containerStyle: React.CSSProperties = {
    backgroundColor: primaryColor,

    fontSize,
    fontWeight,
  };

  const previewStyle: React.CSSProperties = {
    backgroundColor: secondaryColor,
    borderColor: borderColor,
    borderWidth: borderWidth,
    borderStyle: "solid",
  };

  const darkPrimaryColor="dark:"+primaryColor;
  const darkSecondaryColor="dark:"+secondaryColor;

  return (
    <div className={`px-3 py-4 relative rounded-md transition-[border] border-4 border-gray-200 duration-100 bg-gray-200   hover:border-gray-400 ${tailwindConfig ? darkPrimaryColor+" "+fontSize+" "+fontWeight : ""}`} style={containerStyle} onClick={onClick}>

      <IoCheckmarkCircle className={`absolute top-0 right-0 w-4.5 h-4.5 text-gray-600 ${selected ? "display-block" : "hidden"}`} />
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-1 items-center">
          <div className={"h-4 w-10 rounded-sm bg-gray-300 "+secondaryColor} style={previewStyle} />
          <div className={"h-4 w-3.5 rounded-sm bg-gray-300 "+secondaryColor} style={previewStyle} />
          <div className={"h-4 w-3.5 rounded-sm bg-gray-300 "+secondaryColor} style={previewStyle} />
          <div className={"h-4 w-3.5 rounded-sm bg-gray-300 "+secondaryColor} style={previewStyle} />
        </div>
      </div>

      {/* List of cards */}
      <div className="flex flex-col gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-4.5 w-full rounded-sm bg-gray-100 ${tailwindConfig ? borderWidth+" "+borderColor+" "+darkSecondaryColor : ""}`}
            style={previewStyle}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemePreview;
