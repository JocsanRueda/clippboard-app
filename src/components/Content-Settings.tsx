
import React from "react";
export function ContentSettings({ label, children,firstItem,lastItem,className}: {className?: string, label: string, children?: React.ReactNode,firstItem?:boolean, lastItem?:boolean }) {

  const classContent= firstItem?"rounded-t-md border-width-selected py-2": lastItem?"rounded-b-md border-width-selected py-2" :"border-x-width-selected border-b-width-selected py-2 ";

  return(
    <div className={` text-black dark:text-quaternary w-full py-1   px-2   bg-gray-200 dark:bg-secondary  hover:bg-gray-300 hover:dark:bg-primary transition-colors border-gray-300 dark:border-tertiary-dark transition-border  flex flex-row justify-between items-center gap-2 ${classContent} ${className}`}>
      <h1 className="font-light">{label}</h1>
      {children}
    </div>
  );
}

export default ContentSettings;
