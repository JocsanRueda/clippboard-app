
import ClipboardBody from "@/components/Clipboard";
import { TrayIcon } from '@tauri-apps/api/tray';
import { Window } from "@tauri-apps/api/window"
import { useEffect } from "react";
import "./App.css";

import { Menu } from '@tauri-apps/api/menu';

function App() {

useEffect(() => {
  const setupTray = async () => {
    
    const menu = await Menu.new({
      items: [
        {
          id:"settings",
          text: 'Settings',
        },
        {
          id: 'quit',
          text: 'Quit',
          
        },
      ],
    });

    const options = {
      menu,
      menuOnLeftClick: true,
      
    };

    const tray = await TrayIcon.new(options); 


  };

  setupTray();
}, []);

  return (
    <ClipboardBody />
  );
}

export default App;
