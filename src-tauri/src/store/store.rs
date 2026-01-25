use crate::constants::clipboard_key::{HISTORY, SETTINGS};
use crate::structures::Settings;
use crate::utils::{delete_all_images, delete_image};
use crate::AppStore;
use serde_json::json;
use std::sync::{Arc, Mutex};
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::AppHandle;
use tauri::Wry;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_store::Store;

// Save the current state of the store
pub fn save_store(store: &Arc<Store<Wry>>, history: &Vec<serde_json::Value>) {
    store.set(HISTORY, json!(history));
    store.save().expect("Failed to save store");
}

// get settings from the store
pub fn get_settings(store: &Arc<Store<Wry>>) -> Settings {
    store
        .get(SETTINGS)
        .and_then(|v| serde_json::from_value(v).ok())
        .unwrap_or(Settings {
            expiration_time: 24,
            keyboard_shortcut: "Ctrl+H".to_string(),
            search_shortcut: "Ctrl+F".to_string(),
            delete_all_shortcut: "Ctrl+Del".to_string(),
            sort_shortcut: "Ctrl+S".to_string(),
            language: "es".to_string(),
            item_limit: 200,
            rounded_window_corners: false,
            font_size: "12".to_string(),
            item_order: "ascending".to_string(),
            horizontal_size: 380.0,
            vertical_size: 440.0,
        })
}

// Clean up the store
pub fn clean_store(
    store: &Arc<Store<Wry>>,
    app_handle: AppHandle,
    expiration_secs: u64,
) -> Vec<serde_json::Value> {
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();

    let mut history: Vec<serde_json::Value> = store
        .get(HISTORY)
        .unwrap_or(json!([]))
        .as_array()
        .cloned()
        .unwrap_or_default();

    let last_item = history.last().cloned();
    history.retain(|item| {
        let is_recent = item
            .get("timestamp")
            .and_then(|ts| ts.as_u64())
            .map(|ts| now.saturating_sub(ts) < expiration_secs)
            .unwrap_or(true);

        let is_fixed = item
            .get("fixed")
            .and_then(|fixed| fixed.as_bool())
            .map(|fixed| fixed)
            .unwrap_or(true);

        let path = item
            .get("path")
            .and_then(|path| path.as_str())
            .map(|path| path.to_string());

        if let Some(path) = path {
            if !is_recent && !is_fixed {
                delete_image(path);
            }
        }

        is_recent || is_fixed
    });

    store.set(HISTORY, json!(history));
    store.save().expect("Failed to save store");

    if let Some(last) = last_item {
        if !history.contains(&last) {
            if let Err(e) = app_handle.clipboard().clear() {
                eprintln!("Failed to clear clipboard: {}", e);
            }
        }
    }

    history
}

// Save the current state of the store
#[tauri::command]
pub fn save_store_command(state: tauri::State<'_, AppStore>, history: Vec<serde_json::Value>) {
    let store = state.0.lock().unwrap();

    store.set(HISTORY, json!(history));
    store.save().expect("Failed to save store");
}

// Update an item
#[tauri::command]
pub fn update_item_command(
    state: tauri::State<'_, AppStore>,
    global_history: tauri::State<'_, Arc<Mutex<Vec<serde_json::Value>>>>,
    index: usize,
    property_name: String,
    new_value: serde_json::Value,
) {
    println!("updating item at index {} ", index);
    let store = state.0.lock().unwrap();
    let mut history = global_history.lock().unwrap();

    if index < history.len() {
        history[index][property_name] = new_value;
        store.set(HISTORY, json!(&*history));
        store.save().expect("Failed to save store");
    } else {
        println!("Index out of range: {}", index);
    }
}

// delete an item
#[tauri::command]
pub fn delete_item_command(
    state: tauri::State<'_, AppStore>,
    global_history: tauri::State<'_, Arc<Mutex<Vec<serde_json::Value>>>>,
    index: usize,
) {
    println!("Deleting item at index: {}", index);
    let store = state.0.lock().unwrap();
    let mut history = global_history.lock().unwrap();

    if index < history.len() {
        let removed = history.remove(index);
        if let Some(path) = removed.get("path").and_then(|p| p.as_str()) {
            delete_image(path.to_string());
        }
        store.set(HISTORY, json!(&*history));
        store.save().expect("Failed to save store");
    } else {
        println!("Index out of range: {}", index);
    }
}

//Delete all items
#[tauri::command]
pub fn delete_all_items_command(
    state: tauri::State<'_, AppStore>,
    global_history: tauri::State<'_, Arc<Mutex<Vec<serde_json::Value>>>>,
) {
    let store = state.0.lock().unwrap();
    let mut history = global_history.lock().unwrap();

    let filtered: Vec<serde_json::Value> = history
        .drain(..)
        .filter(|item| item["fixed"] == true)
        .collect();

    history.extend(filtered);

    store.set(HISTORY, json!(&*history));
    store.save().expect("Failed to save store");

    delete_all_images();
}

//Fixed item
#[tauri::command]
pub fn fixed_item_command(
    state: tauri::State<'_, AppStore>,
    global_history: tauri::State<'_, Arc<Mutex<Vec<serde_json::Value>>>>,
    index: usize,
    new_value: bool,
) {
    let store = state.0.lock().unwrap();
    let mut history = global_history.lock().unwrap();

    if index < history.len() {
        history[index]["fixed"] = json!(new_value);
        store.set(HISTORY, json!(&*history));
        store.save().expect("Failed to save store");
    } else {
        println!("Index out of range: {}", index);
    }
}
