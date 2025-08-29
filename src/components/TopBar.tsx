import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { CgTrash } from "react-icons/cg";

function TopBar({ deleteFunction, setFilter, filter }: { deleteFunction: () => void, setFilter: (filter: string) => void, filter: string }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <div className="flex justify-end items-center px-2 py-3 bg-gray-800 gap-4 my-2 mx-1 ">
      


      <div className={`flex items-center ${isSearchVisible ? "bg-gray-700 text-gray-900" : ""} text-white rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-blue-400 overflow-hidden`}>
        <FaMagnifyingGlass
          className={`${isSearchVisible ? "text-gray-400 mr-2 scale-95" : "text-white -m-1 hover:text-blue-400 hover:scale-120"} cursor-pointer transition-[color,scale] duration-100  `}
          onClick={() => setIsSearchVisible(!isSearchVisible)} 
        />
        <input
          type="text"
          placeholder="Search..."
          className={`bg-transparent focus:outline-none text-white transition-[width,opacity] duration-100 ${
            isSearchVisible ? "w-65 opacity-100" : "w-0 opacity-0"
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
    </div>
  );
}

export default TopBar;