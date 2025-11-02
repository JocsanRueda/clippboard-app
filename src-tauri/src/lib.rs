// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

mod watchers;
pub mod constants;
pub mod store;
pub mod structures;
mod tray;
pub mod utils;
pub mod window;
pub mod shortcut;

use tauri::{Wry, WindowEvent,Manager};
use tauri_plugin_store::Store;
use tauri_plugin_store::StoreExt;
use crate::shortcut::{setup_global_shortcut,on_shortcuts_command,off_shortcuts_command};

use crate::store::store::{
    clean_store, delete_all_items_command, delete_item_command, fixed_item_command, get_settings,
    save_store_command, update_item_command,
};

use crate::window::{hide_window_command};

use std::sync::{Arc, Mutex};

use crate::constants::clipboard_key::{FILE_HISTORY, FILE_SETTINGS};
use crate::utils::files::write_image_command;
pub struct AppStore(pub Arc<Mutex<Arc<Store<Wry>>>>);

use crate::tray::setup_tray;
use crate::utils::{GLOBAL_DATA_PATH};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .setup(|app| {

            // Initialize settings value
            let store_settings = app.store(FILE_SETTINGS).expect("Failed to open store");
            

            let settings = get_settings(&store_settings);


            println!("App settings: {:?}", settings);

            let app_handle = app.handle().clone();
            
            // Escucha eventos en la ventana principal
            if let Some(window) = app_handle.get_webview_window("main") {
                window.on_window_event(move |event| {
                    if let WindowEvent::CloseRequested { api, .. } = event {
                      
                        api.prevent_close();

                        let window = app_handle.get_webview_window("main").unwrap();
                        hide_window_command(window);

                    }
                });
            }




            let local_data_dir = app.path()
                .app_local_data_dir()
                .expect("Failed to get app local data directory");

            let path_string = local_data_dir
                .to_str()
                .expect("Invalid characters in path")
                .to_string();

            
            if let Err(_) = GLOBAL_DATA_PATH.set(path_string) {
                println!("Global variable was already initialized.");
            } else {
                println!("Global variable initialized successfully.");
            }

            // Setup global shortcut
            setup_global_shortcut(&app.handle().clone(), settings.keyboard_shortcuts.clone())?;

            // Setup the tray
            setup_tray(app)?;
            

            

            // Initialize the store
            let store = app.store(FILE_HISTORY).expect("Failed to open store");
            let global_store = Arc::new(Mutex::new(store));
            app.manage(AppStore(global_store.clone()));

            // Clean up the store
            let initial_history = clean_store(
                &global_store.lock().unwrap(),
                app.handle().clone(),
                settings.expiration_time,
            );

            let global_history = Arc::new(Mutex::new(initial_history));
            app.manage(global_history.clone());

            watchers::start_clipboard_watcher(
                app.handle().clone(),
                global_store.clone(),
                global_history.clone(),
                settings.limit_items,
            );

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_store_command,
            update_item_command,
            delete_item_command,
            delete_all_items_command,
            fixed_item_command,
            hide_window_command,
            write_image_command,
            on_shortcuts_command,
            off_shortcuts_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
