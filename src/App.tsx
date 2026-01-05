
import { useEffect } from "react";
import "./App.css";

import ClipboardBody from "./components/ClipboardBody";
import WindowControls from "./components/Window-Controls";
import { useSystemSettingsContext } from "./context/System-Settings-Context";
import { initLanguage } from "./utils/languages";

function App() {

  const {settings}= useSystemSettingsContext();
  useEffect(() => {

    const initLang= async (lang: string) => {
      await initLanguage(lang );
    };
    initLang(settings.language);

  }, [settings.language]);

  return (
    <div className={`font-sans
        flex flex-col h-screen overflow-hidden
        ${settings.rounded_window_corners ? "rounded-lg" : ""}
        border-2 border-gray-500
      `}
    >

      <WindowControls roundedWindow={settings.rounded_window_corners} />

      <ClipboardBody />

    </div>

  );
}

export default App;
