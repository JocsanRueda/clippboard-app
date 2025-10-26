use crate::constants::clipboard_event::NEW_ITEM;
use crate::constants::clipboard_key::{IMAGE, TEXT};
use crate::constants::string::EMPTY;
use crate::store::store::save_store;
use crate::utils::array::add_unique;
use crate::utils::files::{save_image, save_thumbnail};
use serde_json::json;
use std::sync::mpsc::channel;
use std::sync::{Arc, Mutex};
use std::{thread, time::Duration};
use tauri::AppHandle;
use tauri::Emitter;
use tauri::Wry;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_store::Store;
use tauri::image::Image;
use std::hash::{DefaultHasher, Hash, Hasher};
use thread_priority::{set_current_thread_priority, ThreadPriority};
/// Starts a clipboard watcher that monitors the clipboard for changes
pub fn start_clipboard_watcher(
    app_handle: AppHandle,
    store_global: Arc<Mutex<Arc<Store<Wry>>>>,
    global_history: Arc<Mutex<Vec<serde_json::Value>>>,
    max_history: usize,
) {
   
      
    
        let (tx_fast,rx_fast)=channel::<Image>();
        let (tx_slow,rx_slow)=channel::<(Image<'static>, String)>();
        let worker_app_handle=app_handle.clone();
        let worker_store_global=store_global.clone();
        let worker_history=global_history.clone();



        thread::spawn(move || {

            let _ = set_current_thread_priority(ThreadPriority::Min);

            for (new_image,file_name) in rx_slow {


            let _ =save_image(&new_image,file_name);

            
        }
        });

        thread::spawn(move || {

            let _ = set_current_thread_priority(ThreadPriority::Min);

            for new_image in rx_fast {



            let file_name=save_thumbnail(&new_image);

            let mut history= worker_history.lock().unwrap();
            if let Some(entry) = history.last_mut() {
                if let Some(obj) = entry.as_object_mut() {
                    obj.insert("path".to_string(), json!(file_name.clone()));
                }
            }

            let payload = json!({
                "value": new_image.rgba().len().to_string(),
                "path": file_name.clone(),
                "type": IMAGE
            });

            let _=worker_app_handle.emit(NEW_ITEM, payload);
            let store = worker_store_global.lock().unwrap();
            save_store(&store, &*history);

            let _ =tx_slow.send((new_image.to_owned(),file_name.clone()));
        }
        });

        
        

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

            if let Ok(new_image) = app_handle.clipboard().read_image() {
                let mut history = global_history.lock().unwrap();
                

                let image_bytes = new_image.rgba();
                let mut hasher = DefaultHasher::new();
                image_bytes.hash(&mut hasher);

                let hash_string = hasher.finish().to_string();

                if hash_string != last_image_hash && history.len() < max_history {
                    last_image_hash = hash_string.clone();
                    let last_length = history.len();

                    *history = add_unique(history.clone(), &last_image_hash, IMAGE, EMPTY);

                    if last_length < history.len() {
                        let _ = tx_fast.send(new_image.to_owned());
                    }
                }
            }

            thread::sleep(Duration::from_millis(600));
        }
    });
}
