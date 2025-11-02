#[tauri::command]
pub fn hide_window_command(window: tauri::WebviewWindow) {

    if let Ok(is_visible) = window.is_visible() {
        if !is_visible {
            return;
        }
    }
        
    
    let _ = window.hide();
}

pub fn show_window_command(window: tauri::WebviewWindow) {

    if let Ok(is_visible) = window.is_visible() {
    
        if is_visible {
            let _ = window.set_always_on_top(true);
            let _ = window.set_focus();
            return;
        }
    }

   let _ = window.unminimize();
   let _ = window.show();
   
}


