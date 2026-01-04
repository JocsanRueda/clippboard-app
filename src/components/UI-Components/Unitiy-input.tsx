
export type UnityInputProps = {
  unity: string;
  type: "text" | "number";
  min?: number;
  max?: number;
  placeholder: string;
  value?: string | number;
  // eslint-disable-next-line no-unused-vars
  onSelect: (value: string | number) => void;
};

export function UnityInput({ unity, type, placeholder, onSelect, min, max, value }: UnityInputProps) {

  return (

    <div className="flex flex-row items-center border-width-selected border-gray-400 focus-within:border-gray-500 dark:border-tertiary dark:focus-within:border-tertiary-dark rounded-md  my-0.5">
      <input
        type={type}
        max={max??100}
        min={min??0}
        required
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        placeholder={placeholder}
        className="no-spinner dark:bg-primary focus:outline-none rounded-l-md rounded-y-md p-1 text-black dark:text-quaternary transition-[width,opacity] duration-100 w-20 text-right px-2 py-2"

      />
      <span className="font-light py-2 dark:bg-secondary-light  border-l-width-selected border-gray-400 focus-within:border-gray-500 dark:border-tertiary dark:group-focus-within:border-tertiary  rounded-y-sm rounded-r-sm p-1 text-black dark:text-quaternary transition-[width,opacity] duration-100">{unity}</span>
    </div>

  );
}
