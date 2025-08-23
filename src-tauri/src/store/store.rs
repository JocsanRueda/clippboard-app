use crate::AppStore;
use serde_json::json;
use std::sync::{Arc, Mutex};
use tauri::Wry;
use tauri_plugin_store::Store;

pub fn save_store(store: &Arc<Store<Wry>>, history: &Vec<serde_json::Value>, key: &str) {
    store.set(key, json!(history));
    store.save().expect("Failed to save store");
}

#[tauri::command]
pub fn save_store_command(
    state: tauri::State<'_, AppStore>,
    history: Vec<serde_json::Value>,
    key: &str,
) {
    let store = state.0.lock().unwrap();

    store.set(key, json!(history));
    store.save().expect("Failed to save store");
}

#[tauri::command]
pub fn update_item_command(
    state: tauri::State<'_, AppStore>,
    global_history: tauri::State<'_, Arc<Mutex<Vec<serde_json::Value>>>>,
    index: usize,
    new_value: serde_json::Value,
    key: String,
) {
    let store = state.0.lock().unwrap();
    let mut history = global_history.lock().unwrap();

    println!(
        "Updating item at index: {}, new value: {}",
        index, new_value
    );

    if index < history.len() {
        history[index]["text"] = new_value; // Actualiza el elemento en el índice especificado
        store.set(key, json!(&*history));
        store.save().expect("Failed to save store");
    } else {
        println!("Index out of range: {}", index);
    }
}

#[tauri::command]
pub fn delete_item_command(
    state: tauri::State<'_, AppStore>,
    global_history: tauri::State<'_, Arc<Mutex<Vec<serde_json::Value>>>>,
    index: usize,
    key: String,
) {
    println!("Deleting item at index: {}", index);
    let store = state.0.lock().unwrap();
    let mut history = global_history.lock().unwrap();

    if index < history.len() {
        history.remove(index);
        store.set(key, json!(&*history));
        store.save().expect("Failed to save store");
    } else {
        println!("Index out of range: {}", index);
    }
}
