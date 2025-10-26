import { FiClipboard } from "react-icons/fi";

export function NoResult(){

  return(

    <div className="flex flex-col justify-center items-center gap-3">
      <FiClipboard className="text-gray-400 font-light dark:text-gray-500 text-6xl mx-auto mt-20" />
      <p
        className="text-gray-950 dark:text-white text-lg font-semibold tracking-tight break-all"
      >Copy Element Here</p>
    </div>
  );
}
