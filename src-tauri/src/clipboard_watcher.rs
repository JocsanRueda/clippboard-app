use crate::store::store::save_store;
use crate::utils::array::add_unique;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Wry;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_store::Store;
use crate::constants::clipboard_event::NEW_ITEM;


/// Starts a clipboard watcher that monitors the clipboard for changes
pub fn start_clipboard_watcher(
    app_handle: AppHandle,
    store_global: Arc<Mutex<Arc<Store<Wry>>>>,
    global_history: Arc<Mutex<Vec<serde_json::Value>>>,
    max_history: usize,
) {
    thread::spawn(move || {
        let mut last_value = String::new();
       
        loop {
            if let Ok(current) = app_handle.clipboard().read_text() {

                let mut history = global_history.lock().unwrap();

                if current != last_value && !current.is_empty() && history.len() < max_history {
                    println!("max_history: {}", max_history);
                    last_value = current.clone();


                    let last_length = history.len();

                    *history = add_unique(history.clone(), &last_value);

                    if last_length < history.len() {
                     
                        // Emit the clipboard change event
                        app_handle
                            .emit(NEW_ITEM, last_value.clone())
                            .unwrap();

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
