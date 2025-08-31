import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { CgTrash } from "react-icons/cg";
import { LuSun,  LuMoon  } from  "react-icons/lu";
import { TopBarProps } from "@/types/top-bar.type";

function TopBar({ deleteFunction, setFilter, filter }: TopBarProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    if (isDarkMode) {
      htmlElement.classList.remove("dark");
    } else {
      htmlElement.classList.add("dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex justify-end items-center px-2 py-3 dark:bg-gray-800 gap-4 my-2 mx-1 ">

      <div className={`flex items-center ${isSearchVisible ? "bg-gray-300 dark:bg-gray-700 text-gray-900" : ""} text-white rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-gray-400 focus-within:dark:ring-blue-400 overflow-hidden`}>
        <FaMagnifyingGlass
          className={`${isSearchVisible ? "text-gray-400 mr-2 scale-95" : "text-gray-900 dark:text-white -m-1 hover:text-blue-400 hover:scale-120"} cursor-pointer transition-[color,scale] duration-100  `}
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        />
        <input
          type="text"
          placeholder="Search..."
          className={`bg-transparent focus:outline-none   text-black dark:text-white transition-[width,opacity] duration-100 ${
            isSearchVisible ? "w-50 opacity-100" : "w-0 opacity-0"
          }`}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>

      {/*  Delete All */}
      <CgTrash
        className="transition-[color,scale] duration-100 text-gray-900 dark:text-white hover:text-red-400 hover:scale-135 scale-120 "
        onClick={deleteFunction}
      />

      {/* Settings */}
      <IoSettingsSharp
        className="transition-[color,scale] duration-100 text-gray-900 dark:text-white hover:text-blue-400 hover:scale-120"
      />

      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-0.5 transition-colors duration-300"
      >
        <div
          className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300  ${
            isDarkMode ? "translate-x-3" : "  -translate-x-3 bg-white"
          }`}
        >  {isDarkMode ? <LuSun className="text-white" /> : <LuMoon className="text-gray-500" />} </div>
      </button>

    </div>

  );
}

export default TopBar;
