import { TbPencil } from "react-icons/tb";
import { FaRegSave } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

function OptionSquare({ toggleMenu, handleDelete, disabledEdit, editText, handleEdit, handleSave }: { toggleMenu: boolean, handleDelete: () => void, disabledEdit?: boolean, editText?: boolean, handleEdit: () => void, handleSave: () => void }) {

  const handleOption = (option: string) => {
    switch (option) {
      case "edit":
        handleEdit();
        break;
      case "save":
        handleSave();
        break;
      default:
        break;
    }
  }

  
  return (
    <div
      className={`flex flex-row gap-2 transition-all duration-300 ease-out ${toggleMenu ?"max-w-full opacity-100 ": "max-w-0 opacity-0"}`}
    >

      <section className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md shadow-lg border-3 border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-border duration-200 flex items-center " onClick={() => handleOption(editText && !disabledEdit ? "save" : "edit")}>
        {
          editText &&!disabledEdit?  <FaRegSave className={`text-gray-900 transition-scale duration-100 ${!disabledEdit ? "dark:text-gray-300 hover:scale-120" : "dark:text-gray-500"} m-3`} /> :
          <TbPencil className={`text-gray-900 transition-scale duration-100 ${!disabledEdit ? "dark:text-gray-300 hover:scale-120" : "dark:text-gray-500"} m-3`}  />
             
        }
      </section>


      <section className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md shadow-lg border-3 border-gray-300 dark:border-gray-700 hover:border-gray-400 transition-border duration-200 flex items-center">

        <FaTrashCan className="transition-[color,scale] duration-100 text-gray-900 dark:text-white  hover:text-red-400 m-3 hover:scale-120" onClick={handleDelete} />

      </section>

    </div>
  );
}

export default OptionSquare;