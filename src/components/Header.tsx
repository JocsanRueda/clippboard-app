import { FaTrashCan } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import IconSquare from "./icon-square";

function Header() {
  return (
    <div className="flex justify-end items-center p-2  bg-gray-800">
      <IconSquare icon={FaTrashCan} />
      <IconSquare icon={IoSettingsSharp} />
    </div>
  );
}

export default Header;