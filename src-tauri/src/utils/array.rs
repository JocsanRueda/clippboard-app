use crate::utils::data::get_data_now;
use crate::utils::string::normalize_string;
use serde_json::json;
use crate::constants::clipboard_key::{IMAGE, TEXT};
pub fn add_unique(
     array: &mut Vec<serde_json::Value>,
    value: &str,
)  {
    let last_value = normalize_string(value);

    let timestamp = get_data_now();


    let new_item = json!({
        "value": last_value,
        "type": TEXT,
        "fixed": false,
        "path": null,
        "timestamp": timestamp
    });

    if !array
        .iter()
        .any(|item| item["value"] == new_item["value"] && item["type"] == new_item["type"])
    {
        array.push(new_item);
    }


}


pub fn add_image(
    array: &mut Vec<serde_json::Value>
) {
    let last_value = normalize_string(IMAGE);

    let timestamp = get_data_now();


    let new_item = json!({
        "value": last_value,
        "type": IMAGE,
        "fixed": false,
        "path": format!("image_{}", timestamp),
        "timestamp": timestamp
    });

    
        array.push(new_item);
    

   
}