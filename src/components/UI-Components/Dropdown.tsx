import { BsCaretUpFill, BsCheckLg } from "react-icons/bs";
import { DropdownProps } from "../../types/dropdown-type";
import { useTranslation } from "react-i18next";
import { extractLetter, extractNumber } from "@/utils/string";

export function Dropdown({ options, onSelect, selectedValue,isOpen, onToggle }: DropdownProps) {

  const { t } = useTranslation();

  const handleOptionClick = (index: number) => {
    onSelect(options[index].value);

    onToggle();
  };

  const getLabel=(value:string )=>{

    const numberPart=extractNumber(value);
    const letterPart=extractLetter(value);
    return numberPart.length>0 ? `${numberPart} ${t(letterPart)}` : t(letterPart);

  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="font-light text-black dark:text-white bg-gray-300 dark:bg-secondary-light border-solid border-width-selected  rounded-lg  px-3 py-2.5 text-center inline-flex items-center border-gray-400   dark:border-tertiary-dark "
        type="button"
      >
        {getLabel(options.find(option => option.value === selectedValue)?.label || "Select")}

        <BsCaretUpFill className={`w-3 h-3 ms-3 transition-transform ${
          !isOpen ? "rotate-180" : "rotate-0"
        }`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute  left-1/2 -translate-x-1/2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm min-w-28 max-w-36 dark:bg-primary border-width-selected border-gray-300 dark:border-tertiary-dark mt-1">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleOptionClick(index)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary dark:hover:text-white"
                >
                  {getLabel(option.label)}
                  {selectedValue === option.label && (
                    <BsCheckLg className="inline-block w-4 h-4 ms-2" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
