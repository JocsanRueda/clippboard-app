use std::sync::OnceLock;
use dirs;
use std::path::PathBuf;
pub static GLOBAL_DATA_PATH: OnceLock<String> = OnceLock::new();

pub fn get_local_data_path() -> Result<String, String> {
    //
    match GLOBAL_DATA_PATH.get() {
        
        Some(path) => Ok(path.clone()),
        None => Err("failed copie global path".to_string()),
    }
}

pub fn get_screenshot_path() -> Option<PathBuf> {
    
    let pictures_dir = match dirs::picture_dir() {
        Some(path) => path,
        None => return None, 
    };

    let common_names = [
        "Screenshots",          
        "Capturas de pantalla", 
    ];
    
    for name in common_names.iter() {
        let screenshot_path = pictures_dir.join(name);

        if screenshot_path.exists() && screenshot_path.is_dir() {
            
            return Some(screenshot_path);
        }
    }
  
   
    if pictures_dir.exists() {
        return Some(pictures_dir);
    }
    
    None
}
