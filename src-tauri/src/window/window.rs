
use std::time::Duration;
use std::thread;
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

    if let Ok(true) = window.is_visible() {
    
        if let Ok(true) = window.is_focused(){
       
            return;
        }
    }
   let _ = window.unminimize();
   let _ = window.show();
   let _ = window.set_always_on_top(true);
   let _ = window.set_focus();


   let _ = tauri::async_runtime::spawn(async move {
        thread::sleep(Duration::from_millis(100));
        let _ = window.set_always_on_top(false);
   });
   
}


