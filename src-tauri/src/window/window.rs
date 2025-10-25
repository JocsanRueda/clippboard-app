

#[tauri::command]
pub fn hide_window_command(window: tauri::Window) {
    let _ = window.hide();
}
