use std::thread;
use std::time::Duration;

// Hide the window
#[tauri::command]
pub fn hide_window_command(window: tauri::WebviewWindow) {
    if let Ok(is_visible) = window.is_visible() {
        if !is_visible {
            return;
        }
    }

    let _ = window.hide();
}

// Show the window
pub fn show_window_command(window: tauri::WebviewWindow) {
    if let Ok(true) = window.is_visible() {
        if let Ok(true) = window.is_focused() {
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

pub fn resize_window(window: &tauri::WebviewWindow, width: f64, height: f64) {
    println!("Resizing window to  h{} x v{}", width, height);
    let _ = window.set_size(tauri::Size::Logical(tauri::LogicalSize { width, height }));
}

// Resize the window
#[tauri::command]
pub fn resize_window_command(window: tauri::WebviewWindow, width: f64, height: f64) {
    resize_window(&window, width, height);
}
