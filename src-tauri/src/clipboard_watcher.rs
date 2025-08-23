use crate::store::store::save_store;
use crate::utils::array::add_unique;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Wry;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_store::Store;

/// Starts a clipboard watcher that monitors the clipboard for changes
pub fn start_clipboard_watcher(
    app_handle: AppHandle,
    store_global: Arc<Mutex<Arc<Store<Wry>>>>,
    global_history: Arc<Mutex<Vec<serde_json::Value>>>,
) {
    thread::spawn(move || {
        let mut last_value = String::new();

        loop {
            if let Ok(current) = app_handle.clipboard().read_text() {
                if current != last_value && !current.is_empty() {
                    last_value = current.clone();
                    println!("Current clipboard value: {}", last_value);

                    let mut history = global_history.lock().unwrap();

                    let last_length = history.len();

                    *history = add_unique(history.clone(), &last_value);

                    if last_length < history.len() {
                        // Emit the clipboard change event
                        app_handle
                            .emit("clipboard-changed", last_value.clone())
                            .unwrap();

                        // Save the updated history to the store
                        let store = store_global.lock().unwrap();
                        save_store(&store, &*history, "history");
                    }
                }
            }

            thread::sleep(Duration::from_millis(500));
        }
    });
}
