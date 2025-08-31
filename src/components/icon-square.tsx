import { IconType } from "react-icons";

type IconSquareProps = {
  icon: IconType;
};

function IconSquare({ icon: Icon }: IconSquareProps) {
  return (
    <div className=" px-2 py-2" >
      <Icon className="text-white transition-transform hover:scale-120" />
    </div>
  );
}

export default IconSquare;
