
import "./App.css";

import ClipboardBody from "./components/Clipboard";
import WindowControls from "./components/Window-Controls";
import { useSystemSettingsContext } from "./context/System-Settings-Context";
function App() {

  const {settings}= useSystemSettingsContext();

  return (
    <div className={`font-sans
        flex flex-col h-screen overflow-hidden
        ${settings.rounded_window ? "rounded-lg" : ""}
        border-2 border-black
      `}
    >

      <WindowControls roundedWindow={settings.rounded_window} />

      <ClipboardBody />

    </div>

  );
}

export default App;
