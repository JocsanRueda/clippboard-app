use crate::utils::string::normalize_string;
use serde_json::json;
use crate::utils::data::get_data_now;
pub fn add_unique(
    mut array: Vec<serde_json::Value>,
    value: &str,
    type_item: &str,
    path: &str,
) -> Vec<serde_json::Value> {
    let last_value = normalize_string(value);
    
    let timestamp = get_data_now();

    let path_json = if path == "" {
        serde_json::Value::Null
    } else {
        serde_json::Value::String(path.to_string())
    };
    let new_item = json!({
        "value": last_value,
        "type": type_item,
        "fixed": false,
        "path": path_json,
        "timestamp": timestamp
    });

    if !array
        .iter()
        .any(|item| item["value"] == new_item["value"] && item["type"] == new_item["type"])
    {
        array.push(new_item);
    }

    array
}
