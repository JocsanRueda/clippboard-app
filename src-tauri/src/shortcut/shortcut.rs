use tauri_plugin_global_shortcut::{
    self, Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState,
};

use crate::{ window::show_window_command};
use tauri::{AppHandle};



pub fn parse_shortcut(keys: Vec<&str>) -> Option<Shortcut> {
    let mut modifiers = Modifiers::empty();
    let mut key_code: Option<Code> = None;

    for key in keys {
        match key.to_ascii_uppercase().as_str() {
            "CTRL" | "CONTROL" => modifiers |= Modifiers::CONTROL,
            "ALT" => modifiers |= Modifiers::ALT,
            "SHIFT" => modifiers |= Modifiers::SHIFT,
            "META" | "SUPER" | "CMD" | "COMMAND" => modifiers |= Modifiers::META,

            // Tecla principal (una sola letra A–Z)
            other if other.len() == 1 && other.chars().all(|c| c.is_ascii_alphabetic()) => {
                let ch = other.chars().next().unwrap().to_ascii_uppercase();
                key_code = match ch {
                    'A' => Some(Code::KeyA),
                    'B' => Some(Code::KeyB),
                    'C' => Some(Code::KeyC),
                    'D' => Some(Code::KeyD),
                    'E' => Some(Code::KeyE),
                    'F' => Some(Code::KeyF),
                    'G' => Some(Code::KeyG),
                    'H' => Some(Code::KeyH),
                    'I' => Some(Code::KeyI),
                    'J' => Some(Code::KeyJ),
                    'K' => Some(Code::KeyK),
                    'L' => Some(Code::KeyL),
                    'M' => Some(Code::KeyM),
                    'N' => Some(Code::KeyN),
                    'O' => Some(Code::KeyO),
                    'P' => Some(Code::KeyP),
                    'Q' => Some(Code::KeyQ),
                    'R' => Some(Code::KeyR),
                    'S' => Some(Code::KeyS),
                    'T' => Some(Code::KeyT),
                    'U' => Some(Code::KeyU),
                    'V' => Some(Code::KeyV),
                    'W' => Some(Code::KeyW),
                    'X' => Some(Code::KeyX),
                    'Y' => Some(Code::KeyY),
                    'Z' => Some(Code::KeyZ),
                    _ => None,
                };
            }

            _ => {}
        }
    }

    key_code.map(|code| Shortcut::new(Some(modifiers), code))
}


pub fn setup_global_shortcut(app: &AppHandle, keys: String) -> Result<(), Box<dyn std::error::Error>> {
    
    #[cfg(desktop)]
    {

        let array_keys : Vec<&str> = keys.split('+').map(|s| s.trim()).collect();
        
        let Some(shortcut) = parse_shortcut(array_keys) else {
            eprintln!("dont have shortcut keys");
            return Ok(());
        };

        let manager = app.global_shortcut();

        if manager.is_registered(shortcut.clone()) {
            return Ok(());
        } else {
            manager.unregister_all()?;
        }

            let _= manager.on_shortcut(shortcut.clone(), move |app_handle, _shortcut, event| {

                
                match event.state() {
                    ShortcutState::Pressed => {
                        use tauri::Manager;
                        if let Some(window) = app_handle.get_webview_window("main") {
                            show_window_command(window);
                        }
                    }
                    ShortcutState::Released => {
                        println!("Shortcut Released!");
                    }
                }
            });

        
    }

    Ok(())
}




#[tauri::command]
pub fn off_shortcuts_command (app: AppHandle) -> Result<(), String> {


    app.global_shortcut().unregister_all().map_err(|e| e.to_string())
}   

#[tauri::command]
pub fn  on_shortcuts_command(
    app: AppHandle, keys: String
) -> Result<(), String> {



    setup_global_shortcut(&app, keys).map_err(|e| e.to_string())



}
