import { TbPencil } from "react-icons/tb";
import { FaTrashCan } from "react-icons/fa6";

function OptionSquare({ toggleMenu }: { toggleMenu: boolean }) {
  return (
    <div
      className={`flex flex-row gap-2 transition-all duration-300 ease-out ${toggleMenu ?"max-w-full opacity-100 ": "max-w-0 opacity-0"}`}
    >
      <section className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md shadow-lg border-3 border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-border duration-200 flex items-center">
        <TbPencil className="text-gray-900 dark:text-white m-3" />
      </section>

      <section className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md shadow-lg border-3 border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-border duration-200 flex items-center">
        <FaTrashCan className="text-gray-900 dark:text-white m-3" />
      </section>
    </div>
  );
}

export default OptionSquare;