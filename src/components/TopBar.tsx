import { PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import { useDarkMode } from "@/hooks/useDarkMode";
import { TopBarProps } from "@/types/top-bar.type";
import { getStorageIsDarkMode } from "@/utils/theme";
import { useState } from "react";
import { CgTrash } from "react-icons/cg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { LuMoon, LuSun } from "react-icons/lu";

function TopBar({ deleteFunction, setFilter, filter }: TopBarProps) {

  const {handlePage}= usePageContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getStorageIsDarkMode());

  useDarkMode (isDarkMode);

  const toggleTheme = () => {

    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-end items-center px-2 py-3 dark:bg-primary gap-4 my-1 mx-1 ">

      <div className={`flex items-center ${isSearchVisible ? "bg-gray-300 dark:bg-secondary text-gray-900" : ""} text-quaternary rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-tertiary overflow-hidden`}>
        <FaMagnifyingGlass
          className={`${isSearchVisible ? "text-gray-400 mr-2 scale-95" : "text-gray-900 dark:text-quaternary -m-1 hover:text-tertiary hover:scale-120"} cursor-pointer transition-[color,scale] duration-100  `}
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        />
        <input
          type="text"
          placeholder="Search..."
          className={`bg-transparent focus:outline-none   text-black dark:text-quaternary transition-[width,opacity] duration-100 ${
            isSearchVisible ? "w-50 opacity-100" : "w-0 opacity-0"
          }`}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>

      {/*  Delete All */}
      <CgTrash
        className="transition-[color,scale] duration-100 text-gray-900 dark:text-quaternary hover:text-red-400 hover:scale-135 scale-120 "
        onClick={deleteFunction}
      />

      {/* Settings */}
      <IoSettingsSharp
        className="transition-[color,scale] duration-100 text-gray-900 dark:text-quaternary hover:text-blue-400 hover:scale-120" onClick={() => handlePage(PAGES.SETTINGS)}
      />

      {/* Toggle Theme */}

      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-12 h-6 bg-gray-300 dark:bg-secondary rounded-full p-0.5 transition-colors duration-300"
      >
        <div
          className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300  ${
            isDarkMode ? "translate-x-3" : "  -translate-x-3 bg-white"
          }`}
        >  {isDarkMode ? <LuSun className="text-quaternary" /> : <LuMoon className="text-gray-500" />} </div>
      </button>

    </div>

  );
}

export default TopBar;
