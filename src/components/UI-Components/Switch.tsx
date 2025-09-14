import { useState } from "react";

export function Switch({actionToggle}:{actionToggle: () => void}){

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    actionToggle();
  };

  return(
    <button onClick={handleToggle} className="flex items-center justify-center w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-0.5 transition-colors duration-300">
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition-transform duration-300  ${
          toggle ? "translate-x-3" : "  -translate-x-3 bg-white"
        }`}
      >

      </div>
    </button>

  );
}
