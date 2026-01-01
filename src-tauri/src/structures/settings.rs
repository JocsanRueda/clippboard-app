use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Settings {
pub expiration_time: u64,
    pub item_limit: usize,
    pub keyboard_shortcut: String,
    pub language: String,
    pub rounded_window_corners: bool,
    pub font_size: String,
    pub item_order: String,
    pub vertical_size: f64,
    pub horizontal_size: f64,
   
}
