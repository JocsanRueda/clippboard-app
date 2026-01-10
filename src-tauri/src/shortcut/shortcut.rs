use tauri_plugin_global_shortcut::{GlobalShortcutExt, Shortcut, ShortcutState};

use crate::window::show_window_command;
use tauri::{App, AppHandle, Manager};
use tauri_plugin_global_shortcut::{Code, Modifiers};
pub fn register_global_shortcut(
    app: &AppHandle,
    keys: String,
) -> Result<(), Box<dyn std::error::Error>> {
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

        let _ = manager.unregister(shortcut);

        manager.register(shortcut)?;
    }

    Ok(())
}

pub fn setup_shortcuts_on_startup(
    app: &App,
    keys: String,
) -> Result<(), Box<dyn std::error::Error>> {
    #[cfg(desktop)]
    {
        let ctrl_n_shortcut = Shortcut::new(Some(Modifiers::CONTROL), Code::KeyN);
                app.handle().plugin(
                    tauri_plugin_global_shortcut::Builder::new().with_handler(move |_app, shortcut, event| {
                        println!("{:?}", shortcut);
                        if shortcut == &ctrl_n_shortcut {
                            match event.state() {
                              ShortcutState::Pressed => {
                                println!("Ctrl-N Pressed!");
                              }
                              ShortcutState::Released => {
                                println!("Ctrl-N Released!");
                              }
                            }
                        }
                    })
                    .build(),
                )?;

                app.global_shortcut().register(ctrl_n_shortcut)?;


        // Registramos el atajo inicial
        register_global_shortcut(app.handle(), keys)?;
    }

    Ok(())
}

#[tauri::command]
pub fn off_shortcuts_command(app: AppHandle) -> Result<(), String> {
    app.global_shortcut()
        .unregister_all()
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn on_shortcuts_command(app: AppHandle, keys: String) -> Result<(), String> {
    register_global_shortcut(app.app_handle(), keys).map_err(|e| e.to_string())
}
