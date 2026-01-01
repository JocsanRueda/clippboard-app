use tauri_plugin_global_shortcut::{
    GlobalShortcutExt, Shortcut, ShortcutState
};

use crate::{ window::show_window_command};
use tauri::{AppHandle, App, Manager};

pub fn register_global_shortcut(app: &AppHandle, keys: String) -> Result<(), Box<dyn std::error::Error>> {
    
    #[cfg(desktop)]
    {
        if keys.trim().is_empty() {
            println!("Shortcut keys are empty, skipping registration.");
            return Ok(());
        }

        // Usamos el parser nativo que soporta todas las teclas (Space, Enter, etc.)
        let shortcut = match keys.parse::<Shortcut>() {
            Ok(s) => s,
            Err(e) => {
                eprintln!("Error parsing shortcut '{}': {}", keys, e);
                return Ok(());
            }
        };

        let manager = app.global_shortcut();

        println!("Registering shortcut: {:?}", shortcut);

         manager.unregister_all()?;

         manager.register(shortcut)?;
    }


   
    Ok(())
}

pub fn setup_shortcuts_on_startup(
    app: &App,
    keys: String,
)-> Result<(), Box<dyn std::error::Error>>  {

    #[cfg(desktop)]
    {
        app.handle().plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(move |app_handle, _shortcut, event| {
                    if let ShortcutState::Pressed = event.state() {
                        if let Some(window) = app_handle.get_webview_window("main") {
                            show_window_command(window);
                        }
                    }
                })
                .build(),
        )?;

        // Registramos el atajo inicial
        register_global_shortcut(app.handle(), keys)?;
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

    register_global_shortcut(app.app_handle(), keys).map_err(|e| e.to_string())


    

    

}
