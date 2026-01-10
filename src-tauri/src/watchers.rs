use crate::constants::clipboard_event::NEW_ITEM;
use crate::constants::clipboard_key::TEXT;
use crate::constants::file::MAX_SIZE_BYTES;
use crate::constants::string::EMPTY;
use crate::store::store::save_store;
use crate::utils::array::{add_image, add_unique};
use crate::utils::files::{copy_image, save_thumbnail};
use crate::utils::get_screenshot_path;
use notify::{Config, EventKind, RecommendedWatcher, RecursiveMode, Watcher};
use serde_json::json;
use std::fs::metadata;
use std::path::PathBuf;
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Wry;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_store::Store;
use thread_priority::{set_current_thread_priority, ThreadPriority};

/// Starts a clipboard watcher that monitors the clipboard for changes
pub fn start_clipboard_watcher(
    app_handle: AppHandle,
    store_global: Arc<Mutex<Arc<Store<Wry>>>>,
    global_history: Arc<Mutex<Vec<serde_json::Value>>>,
    max_history: usize,
) {
    let (tx_fast, rx_fast) = channel::<PathBuf>();
    let worker_app_handle = app_handle.clone();
    let worker_store_global = store_global.clone();
    let worker_history = global_history.clone();

    thread::spawn(move || {
        let _ = set_current_thread_priority(ThreadPriority::Min);

        for path in rx_fast {
            let metadata = match metadata(&path) {
                Ok(meta) => meta,
                Err(e) => {
                    eprintln!("Failed to get metadata for file {:?}: {}", path, e);
                    continue;
                }
            };

            if metadata.len() > MAX_SIZE_BYTES {
                continue;
            }

            //open image
            let new_image = match image::open(&path) {
                Ok(img) => img,
                Err(e) => {
                    eprintln!("Failed to open image: {}", e);
                    continue;
                }
            };

            let mut history = worker_history.lock().unwrap();

            add_image(&mut *history);

            let last = history.last().unwrap();

            let file_name = last["path"].as_str().unwrap();

            save_thumbnail(&new_image, file_name);

            copy_image(&path, file_name);

            let _ = worker_app_handle.emit(NEW_ITEM, last.clone());
            let store = worker_store_global.lock().unwrap();
            save_store(&store, &*history);
        }
    });

    //thread for folder picture
    let path_screenshots = match get_screenshot_path() {
        Some(path) => path,
        None => return,
    };

    thread::spawn(move || {
        let (tx, rx) = channel();

        let mut watcher = match RecommendedWatcher::new(tx, Config::default()) {
            Ok(watcher) => watcher,
            Err(e) => {
                eprintln!("Error creating watcher: {}", e);
                return;
            }
        };

        if let Err(e) = watcher.watch(&path_screenshots, RecursiveMode::NonRecursive) {
            eprintln!("Error watching folder: {}", e);
            return;
        }

        for res in rx {
            match res {
                Ok(event) => {
                    if let EventKind::Create(_) = event.kind {
                        thread::sleep(Duration::from_millis(150));

                        if let Some(new_file_path) = event.paths.get(0) {
                            if let Err(e) = tx_fast.send(new_file_path.clone()) {
                                eprintln!("Error: thread are dead {}", e);
                                break; // Detiene este hilo
                            }
                        }
                    }
                }
                Err(e) => eprintln!("Error en el evento del vigilante: {}", e),
            }
        }
    });

    thread::spawn(move || {
        let _ = set_current_thread_priority(ThreadPriority::Min);
        let mut last_value = String::new();

        loop {
            if let Ok(current) = app_handle.clipboard().read_text() {
                let mut history = global_history.lock().unwrap();

                if current != last_value && history.len() < max_history && !current.is_empty() {
                    last_value = current.clone();

                    let last_length = history.len();

                    add_unique(&mut *history, &last_value);

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

            thread::sleep(Duration::from_millis(500));
        }
    });
}
