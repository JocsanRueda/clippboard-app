import { ICON_TOP_BAR_SIZE, PAGES } from "@/constants/constant";
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
  const { handlePage } = usePageContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getStorageIsDarkMode());

  useDarkMode(isDarkMode);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <div className="flex justify-end items-center px-2 py-2.5 dark:bg-primary mx-1 gap-2">

      <div
        className={`flex items-center ${
          isSearchVisible
            ? "flex-grow bg-gray-300 dark:bg-secondary text-gray-900 mr-4"
            : "flex-none"
        } text-quaternary rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-gray-400 dark:focus-within:ring-tertiary overflow-hidden transition-all duration-100`} // Añadido transition-all
      >
        <FaMagnifyingGlass
          size={ICON_TOP_BAR_SIZE}
          className={`${
            isSearchVisible ? "text-gray-400 mr-2 " : "text-gray-900 dark:text-quaternary -m-1 hover:text-tertiary hover:scale-110"
          } cursor-pointer transition-[color,scale] duration-10`}
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        />

        <input
          type="text"
          placeholder="Search..."
          className={`bg-transparent focus:outline-none text-black dark:text-quaternary transition-[width,opacity] duration-100 ${

            isSearchVisible ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Delete All */}
        <CgTrash
          size={ICON_TOP_BAR_SIZE}
          className="transition-[color,scale] duration-100 text-gray-900 dark:text-quaternary dark:hover:text-red-500 hover:scale-135 scale-120 "
          onClick={deleteFunction}
        />

        {/* Settings */}
        <IoSettingsSharp
          size={ICON_TOP_BAR_SIZE}
          className="transition-[color,scale] duration-100 text-gray-900 dark:text-quaternary hover:text-secondary-light hover:scale-120"
          onClick={() => handlePage(PAGES.SETTINGS)}
        />

        {/* Toggle Theme */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-[40px]  bg-gray-300 dark:bg-secondary rounded-full p-0.5 transition-colors duration-300"
        >
          <div
            className={`rounded-full shadow-md transform transition-transform duration-300 m-0.5  ${
              isDarkMode ? "translate-x-[10px]" : "  -translate-x-[10px] bg-white"
            }`}
          >
            {isDarkMode ? (
              <LuSun className="text-quaternary " size={ICON_TOP_BAR_SIZE} />
            ) : (
              <LuMoon className="text-gray-500 " size={ICON_TOP_BAR_SIZE} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default TopBar;
