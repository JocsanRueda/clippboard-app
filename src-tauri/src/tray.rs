// src/tray.rs
use tauri::{
    image::Image,
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    App, Manager, Wry,
};

use crate::window::{hide_window_command, show_window_command};

pub fn setup_tray(app: &App<Wry>) -> tauri::Result<()> {
    let show_i = MenuItem::with_id(app, "open", "Open", true, None::<&str>)?;
    let hidden_i = MenuItem::with_id(app, "close", "Close", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show_i, &hidden_i])?;
    
    let icon_bytes = include_bytes!("../icons/Logo-tray-light.png");
    let icon = image::load_from_memory(icon_bytes).expect("Failed to load tray icon");
    let rgba = icon.to_rgba8();
    let (width, height) = rgba.dimensions();
    let rgba_bytes = rgba.into_raw();

    TrayIconBuilder::new()
        .icon(Image::new_owned(rgba_bytes, width, height))
        .menu(&menu)
        .show_menu_on_left_click(true)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "open" => {
                if let Some(window) = app.get_webview_window("main") {
                    show_window_command(window);
                }
            }
            "close" => {
                if let Some(window) = app.get_webview_window("main") {
                    hide_window_command(window);
                }
            }
            _ => println!("Unhandled menu event: {:?}", event.id),
        })
        .build(app)?;

    Ok(())
}
