

import { loadStore } from "@/utils/store";

import History from "./History";

 function ClipboardBody() {

  loadStore();

  return (
    <div className="min-h-screen min-w-full dark:bg-gray-800 p-1">

     

     

     <History />


    </div>
  );
}

export default ClipboardBody;