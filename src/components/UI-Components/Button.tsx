
export const Button=({label,type}:{label:string, type:string})=>{

  return (
    <input type={type} value={label} className="mt-2 mb-6 bg-gray-200 dark:bg-secondary border-width-selected border-gray-300 dark:border-tertiary-dark hover:dark:border-tertiary text-dark dark:text-white font-light px-4 py-2 rounded-md cursor-pointer  transition-colors duration-100 disabled mr-auto"   />
  );
};
