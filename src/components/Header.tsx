import { HiMiniTrash } from "react-icons/hi2";
import IconSquare from "./icon-square";

function Header() {
  return (
    <header className="header">
      <IconSquare icon={HiMiniTrash} />
    </header>
  );
}

export default Header;