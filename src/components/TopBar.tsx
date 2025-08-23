import { FaTrashCan } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import IconSquare from "./icon-square";

function TopBar({deleteFunction}:{deleteFunction: () => void}) {
  return (
    <div className="flex justify-end items-center px-2 py-3  bg-gray-800">
      <FaTrashCan
          className="transition-[color,scale] duration-100 text-gray-900 dark:text-white hover:text-red-400 m-3 hover:scale-120 "
          onClick={deleteFunction}
        />
      <IconSquare icon={IoSettingsSharp} />
    </div>
  );
}

export default TopBar;