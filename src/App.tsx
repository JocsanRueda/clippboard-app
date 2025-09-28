
import { TrayIcon } from "@tauri-apps/api/tray";
import { useEffect } from "react";
import "./App.css";

import { Menu } from "@tauri-apps/api/menu";
import ClipboardBody from "./components/Clipboard";
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

    <ClipboardBody/>

  );
}

export default App;
