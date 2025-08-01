

import { loadStore } from "@/utils/store";
import Header from "./Header";
import History from "./History";

 function ClipboardBody() {

  loadStore();

  return (
    <div className="min-h-screen min-w-full dark:bg-gray-800 p-1">

     

     <Header />

     <History />


    </div>
  );
}

export default ClipboardBody;