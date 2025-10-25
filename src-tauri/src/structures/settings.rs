use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Settings {
    pub expiration_time: u64,
    pub keyboard_shortcuts: String,
    pub language: String,
    pub limit_items: usize,
}
