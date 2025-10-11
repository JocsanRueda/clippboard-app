
import { usePageContext } from "@/context/Page-Contex";
import { PAGES } from "@/constants/constant";
import History from "./History";
import Settings from "./Settings";

function ClipboardBody() {

  const {currentPage}= usePageContext();

  return (
    <div className="min-h-screen min-w-full bg-gray-200 dark:bg-primary p-1 ">

      {currentPage===PAGES.HOME && <History />}
      {currentPage!==PAGES.HOME && <Settings />}

    </div>
  );
}

export default ClipboardBody;
