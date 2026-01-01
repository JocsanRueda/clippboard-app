pub mod clipboard_key {
    pub const FILE_HISTORY: &str = ".history.json";
    pub const FILE_SETTINGS: &str = ".settings.json";
    pub const HISTORY: &str = "history";
    pub const SETTINGS: &str = "settings";
    pub const TEXT: &str = "text";
    pub const IMAGE: &str = "image";
    pub const FILE_PATH: &str = "/home/ely/.local/share/com.Tuxclip.app";
}

pub mod clipboard_event {
    pub const NEW_ITEM: &str = "new-item";
}

pub mod string {
    pub const EMPTY: &str = "";
}

pub mod file {
    pub const MAX_SIZE_BYTES: u64 = 4 * 1024 * 1024; // 10 MB
}
