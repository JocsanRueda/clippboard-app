
import { PAGES } from "@/constants/constant";
import { usePageContext } from "@/context/Page-Contex";
import GeneralSettings from "./General-Settings";
import History from "./History";

function ClipboardBody() {

  const {currentPage}= usePageContext();

  return (
    <div className="flex-1 min-h-0 bg-gray-200 dark:bg-primary px-1 mt-6">

      {currentPage===PAGES.HOME && <History />}
      {currentPage!==PAGES.HOME && <GeneralSettings />}

    </div>
  );
}

export default ClipboardBody;
