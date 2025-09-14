import { useState } from "react";
import ContentSettings from "./Content-Settings";
import Dropdown from "./UI-Components/Dropdown";
import { IoArrowForwardOutline } from "react-icons/io5";
import { usePageContext } from "@/context/Page-Contex";
import { PAGES } from "@/utils/constant";

export function SystemSettings(){

  const {handlePage}= usePageContext();

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const handleDropdownToggle = (dropdownId: number) => {
    setOpenDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  const timeOptions = [
    { label: "1 hours", value: "1" },
    { label: "6 hours", value: "6" },
    { label: "12 hours", value: "12" },
    { label: "24 hours", value: "24" },
    { label: "48 hours", value: "48" },
  ];

  const limitItemsOptions=[
    { label: "10 items", value: "10" },
    { label: "30 items", value: "30" },
    { label: "50 items", value: "50" },
    { label: "100 items", value: "100" },
    { label: "No limits items", value: "-1" },
  ];

  const languagesOptions=[
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
  ];

  const keyboardLaunchOptions=[
    { label: "ctrl+v", value: "ctrl+v" },
    { label: "super+v", value: "super+v" },
    { label: "personalized", value: "personalized" },
  ];

  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return(
    <div className="w-full max-w-md flex flex-col justify-center items-center p-2">
      <ContentSettings label="Theme" className="rounded-t-md border-3 py-3">

        <IoArrowForwardOutline className="w-7.5 h-7.5 text-gray-600  cursor-pointer border-3 border-gray-300 rounded-md  ml-0.5 p-0.5 " onClick={() => handlePage(PAGES.THEME)} />

      </ContentSettings>
      <ContentSettings label="Expiration Time" className="border-x-3 border-b-3">

        <Dropdown
          options={timeOptions}
          onSelect={handleSelect}
          defaultValue={3}
          isOpen={openDropdown === 0}
          onToggle={() => handleDropdownToggle(0)}
        />
      </ContentSettings>
      <ContentSettings label="Limit of item" className="border-x-3 border-b-3">

        <Dropdown
          options={limitItemsOptions}
          onSelect={handleSelect}
          defaultValue={3}
          isOpen={openDropdown === 1}
          onToggle={() => handleDropdownToggle(1)}
        />
      </ContentSettings>
      <ContentSettings label="Keyboard launch" className="border-x-3 border-b-3">
        <Dropdown
          options={keyboardLaunchOptions}
          onSelect={handleSelect}
          defaultValue={0}
          isOpen={openDropdown === 2}
          onToggle={() => handleDropdownToggle(2)}
        />
      </ContentSettings>
      <ContentSettings label="Language" className="rounded-b-md border-x-3 border-b-3">
        <Dropdown
          options={languagesOptions}
          onSelect={handleSelect}
          defaultValue={0}
          isOpen={openDropdown === 3}
          onToggle={() => handleDropdownToggle(3)}
        />
      </ContentSettings>
    </div>
  );
}
