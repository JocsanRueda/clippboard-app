use crate::constants::clipboard_event::NEW_ITEM;
use crate::constants::clipboard_key::{IMAGE, TEXT};
use crate::constants::string::EMPTY;
use crate::store::store::save_store;
use crate::utils::array::add_unique;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Wry;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_store::Store;
use crate::utils::files::save_image;
use serde_json::json;

/// Starts a clipboard watcher that monitors the clipboard for changes
pub fn start_clipboard_watcher(
    app_handle: AppHandle,
    store_global: Arc<Mutex<Arc<Store<Wry>>>>,
    global_history: Arc<Mutex<Vec<serde_json::Value>>>,
    max_history: usize,
) {
    thread::spawn(move || {
        let mut last_value = String::new();
        let mut last_image_hash = String::new();

        loop {
            if let Ok(current) = app_handle.clipboard().read_text() {
                let mut history = global_history.lock().unwrap();

                if current != last_value && !current.is_empty() && history.len() < max_history {
                    last_value = current.clone();

                    let last_length = history.len();

                    *history = add_unique(history.clone(), &last_value, TEXT, EMPTY);

                    if last_length < history.len() {
                        // Emit the clipboard change event

                        let payload = json!({
                                                "value": last_value.clone(),
                                                "path": EMPTY,
                                                "type": TEXT
                                            });

                        app_handle.emit(NEW_ITEM, payload).unwrap();

                        // Save the updated history to the store
                        let store = store_global.lock().unwrap();

                        save_store(&store, &*history);
                    }
                }
            }

            if let Ok(image) = app_handle.clipboard().read_image() {
                let mut history = global_history.lock().unwrap();
                let size = image.rgba().len().to_string();
                

                if size != last_image_hash && history.len() < max_history {
                    last_image_hash = size.clone();
                    let last_length = history.len();

                    *history = add_unique(history.clone(), &last_image_hash, IMAGE, EMPTY);

                    if last_length < history.len() {

                        let file_name=save_image(&image);

                        let payload = json!({
                                                "value": last_image_hash.clone(),
                                                "path": file_name.clone(),
                                                "type": IMAGE
                                            });

                        app_handle.emit(NEW_ITEM, payload).unwrap();

                        if let Some(entry) = history.last_mut() {
                            if let Some(obj) = entry.as_object_mut() {
                                obj.insert("path".to_string(), json!(file_name.clone()));
                            }
    }


                        // Save the updated history to the store
                        let store = store_global.lock().unwrap();

                        save_store(&store, &*history);
                    }
                }
            }

            thread::sleep(Duration::from_millis(600));
        }
    });
}
