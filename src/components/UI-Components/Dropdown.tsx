import { useState } from "react";
import { BsCaretUpFill } from "react-icons/bs";
import { DropdownProps } from "../../types/dropdown-type";
import { BsCheckLg } from "react-icons/bs";

export function Dropdown({ options, onSelect, defaultValue=0,isOpen, onToggle }: DropdownProps) {

  const [selectedValue, setSelectedValue] = useState<string | null>(options[defaultValue].label);

  const handleOptionClick = (index: number) => {
    onSelect(options[index].value);
    setSelectedValue(options[index].label);
    onToggle();
  };

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="font-light text-black dark:text-white bg-gray-300 dark:bg-gray-900  border-solid  rounded-lg  px-3 py-2.5 text-center inline-flex items-center border-gray-400   dark:border-gray-700 "
        type="button"
      >
        {selectedValue}

        <BsCaretUpFill className={`w-3 h-3 ms-3 transition-transform ${
          !isOpen ? "rotate-180" : "rotate-0"
        }`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute  left-1/2 -translate-x-1/2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm min-w-28 max-w-36 dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option, index) => (
              <li key={option.value}>
                <button
                  onClick={() => handleOptionClick(index)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option.label}
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
