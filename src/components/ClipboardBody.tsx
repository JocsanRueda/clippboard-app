
import { usePageContext } from "@/context/Page-Contex";
import { PAGES } from "@/constants/constant";
import History from "./History";
import Settings from "./Settings";

function ClipboardBody() {

  const {currentPage}= usePageContext();

  return (
    <div className="flex-1 min-h-0 bg-gray-200 dark:bg-primary px-1 mt-6.5">

      {currentPage===PAGES.HOME && <History />}
      {currentPage!==PAGES.HOME && <Settings />}

    </div>
  );
}

export default ClipboardBody;
