// src/tray.rs
use tauri::{
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
    App, Manager, Wry,
};

pub fn setup_tray(app: &App<Wry>) -> tauri::Result<()> {
    let show_i = MenuItem::with_id(app, "show", "Show", true, None::<&str>)?;
    let hidden_i = MenuItem::with_id(app, "hidden", "Hidden", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&show_i, &hidden_i])?;

    TrayIconBuilder::new()
        .menu(&menu)
        .show_menu_on_left_click(true)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "show" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.unminimize();
                    let _ = window.show();
                    let _ = window.set_focus();
                    println!("Ventana mostrada");
                }
            }
            "hidden" => {
                if let Some(window) = app.get_webview_window("main") {
                    let _ = window.hide();
                }
            }
            _ => println!("Evento de menú no manejado: {:?}", event.id),
        })
        .build(app)?;

    Ok(())
}
