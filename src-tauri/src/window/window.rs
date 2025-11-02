#[tauri::command]
pub fn hide_window_command(window: tauri::WebviewWindow) {
    let _ = window.hide();
}

pub fn show_window_command(window: tauri::WebviewWindow) {
   let _ = window.unminimize();
   let _ = window.show();
   let _ = window.set_focus();
}


