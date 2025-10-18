
import { TrayIcon } from "@tauri-apps/api/tray";
import { useEffect } from "react";
import "./App.css";

import { Menu } from "@tauri-apps/api/menu";
import ClipboardBody from "./components/Clipboard";
import WindowControls from "./components/Window-Controls";
function App() {

  useEffect(() => {
    const setupTray = async () => {

      const menu = await Menu.new({
        items: [
          {
            id:"settings",
            text: "Settings",
          },
          {
            id: "quit",
            text: "Quit",

          },
        ],
      });

      const options = {
        menu,
        menuOnLeftClick: true,

      };

      await TrayIcon.new(options);

    };

    setupTray();
  }, []);

  return (
    <div className="flex flex-col h-screen rounded-lg overflow-hidden">
      <WindowControls/>

      <ClipboardBody />

    </div>

  );
}

export default App;
