use std::sync::OnceLock;

pub static GLOBAL_DATA_PATH: OnceLock<String> = OnceLock::new();

pub fn get_local_data_path() -> Result<String, String> {
    //
    match GLOBAL_DATA_PATH.get() {
        
        Some(path) => Ok(path.clone()),
        None => Err("failed copie global path".to_string()),
    }
}