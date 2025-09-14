import { IoAddSharp } from "react-icons/io5";
import ThemePreview from "./Theme-Preview";
import { useState } from "react";
import { usePageContext } from "@/context/Page-Contex";
import { PAGES } from "@/utils/constant";

export function ThemeSettings() {

  const {handlePage}= usePageContext();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelected = (index: number) => {
    setSelectedIndex(index);
  };

  const themes = [
    {
      primaryColor: "bg-gray-100",
      secondaryColor: "bg-gray-300",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      borderWidth: "border-3",
      borderColor: "border-gray-300",
      tailwindConfig: true,
      selected: true,
    },
    {
      primaryColor: "bg-sky-950",
      secondaryColor: "bg-sky-900",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      borderWidth: "border-3",
      borderColor: "border-sky-800",
      tailwindConfig: true,

    },
    {
      primaryColor: "bg-sky-950",
      secondaryColor: "bg-teal-900",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      borderWidth: "border-3",
      borderColor: "border-teal-800",
      tailwindConfig: true,

    },
    {
      primaryColor: "bg-teal-950",
      secondaryColor: "bg-purple-900",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      borderWidth: "border-3",
      borderColor: "border-gray-400",
      tailwindConfig: true,

    },
    {
      primaryColor: "bg-teal-950",
      secondaryColor: "bg-orange-400",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      borderWidth: "border-3",
      borderColor: "border-orange-400",
      tailwindConfig: true,

    },
    {
      primaryColor: "bg-teal-950",
      secondaryColor: "bg-pink-900",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      borderWidth: "border-3",
      borderColor: "border-pink-400",
      tailwindConfig: true,

    },
    {
      primaryColor: "bg-teal-950",
      secondaryColor: "bg-green-900",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      borderWidth: "border-3",
      borderColor: "border-green-800",
      tailwindConfig: true,

    },
  ];

  return(
    <div className="grid grid-cols-3  place-items-center gap-2">
      {themes.map((theme,index)=>{

        return <ThemePreview key={index} {...theme} onClick={() => handleSelected(index)} selected={selectedIndex === index} />;
      })

      }

      <div className="bg-gray-200 w-10 h-10  flex  items-center justify-center rounded-md border-4 border-gray-200 hover:border-gray-400" onClick={()=>handlePage(PAGES.NEW_THEME)} >
        <IoAddSharp className="w-5 h-5 text-gray-600 hover:scale-120 transition-scale duration-100" />
      </div>
    </div>
  );
}

export default ThemeSettings;
