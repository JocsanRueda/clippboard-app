// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

mod clipboard_watcher;
pub mod constants;
pub mod store;
pub mod structures;
mod tray;
pub mod utils;
pub mod window;

use tauri::Wry;
use tauri_plugin_store::Store;
use tauri_plugin_store::StoreExt;

use crate::store::store::{
    clean_store, delete_all_items_command, delete_item_command, fixed_item_command, get_settings,
    save_store_command, update_item_command,
};

use crate::window::{hide_window_command};

use std::sync::{Arc, Mutex};
use tauri::Manager;

use crate::constants::clipboard_key::{FILE_HISTORY, FILE_SETTINGS};
pub struct AppStore(pub Arc<Mutex<Arc<Store<Wry>>>>);
//use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState};

use crate::tray::setup_tray;
use crate::utils::{GLOBAL_DATA_PATH};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {



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

        
            
            // Setup the tray
            setup_tray(app)?;
            

            // Initialize settings value
            let store_settings = app.store(FILE_SETTINGS).expect("Failed to open store");

            let settings = get_settings(&store_settings);

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

            clipboard_watcher::start_clipboard_watcher(
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
            hide_window_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
