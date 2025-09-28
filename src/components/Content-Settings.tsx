
import React from "react";
export function ContentSettings({className, label, children}: {className?: string, label: string, children?: React.ReactNode}){

  return(
    <div className={` text-black dark:text-quaternary w-full py-1   px-2   bg-gray-200 dark:bg-secondary hover:bg-primary transition-colors border-gray-300 dark:border-tertiary-dark transition-border  flex flex-row justify-between items-center gap-2 ${className}`}>
      <h1 className="font-light">{label}</h1>
      {children}
    </div>
  );
}

export default ContentSettings;
