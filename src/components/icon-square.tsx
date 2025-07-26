import { IconType } from "react-icons";


type IconSquareProps = {
  icon: IconType;
};

function IconSquare({ icon: Icon }: IconSquareProps) {
  return (
    <div className=" px-2 py-2" >
      <Icon className="text-white mt-2" />
    </div>
  );
}

export default IconSquare;