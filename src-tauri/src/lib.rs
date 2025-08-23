// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

mod clipboard_watcher;
pub mod utils;

pub mod store;
pub mod structures;

use tauri::Wry;
use tauri_plugin_store::Store;
use tauri_plugin_store::StoreExt;

use crate::store::store::{
    delete_all_items_command, delete_item_command, save_store_command, update_item_command,
};
use serde_json::json;
use std::sync::{Arc, Mutex};
use tauri::Manager;
pub struct AppStore(pub Arc<Mutex<Arc<Store<Wry>>>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let store = app.store(".clipboard.json").expect("Failed to open store");
            let global_store = Arc::new(Mutex::new(store));
            app.manage(AppStore(global_store.clone()));

            let initial_history = {
                let store = global_store.lock().unwrap();
                store
                    .get("history")
                    .unwrap_or(json!([]))
                    .as_array()
                    .cloned()
                    .unwrap_or_default()
            };

            let global_history = Arc::new(Mutex::new(initial_history));
            app.manage(global_history.clone());

            clipboard_watcher::start_clipboard_watcher(
                app.handle().clone(),
                global_store.clone(),
                global_history.clone(),
            );

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_store_command,
            update_item_command,
            delete_item_command,
            delete_all_items_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
