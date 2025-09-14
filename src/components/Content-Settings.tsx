
import React from "react";
export function ContentSettings({className, label, children}: {className?: string, label: string, children?: React.ReactNode}){

  return(
    <div className={`w-full py-1   px-2   bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 transition-colors border-gray-300 dark:border-gray-700  transition-border  flex flex-row justify-between items-center gap-2 ${className}`}>
      <h1 className="font-light">{label}</h1>
      {children}
    </div>
  );
}

export default ContentSettings;
