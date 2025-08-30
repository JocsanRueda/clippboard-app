use crate::utils::string::normalize_string;
use serde_json::json;
use std::time::{SystemTime, UNIX_EPOCH};

pub fn add_unique(mut array: Vec<serde_json::Value>, text: &str) -> Vec<serde_json::Value> {
    let last_value = normalize_string(text);
    let start = SystemTime::now();
    let timestamp = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();

    let new_item = json!({
        "text": last_value,
        "type": "text",
        "fixed": false,
        "url": null,
        "timestamp": timestamp
    });

    if !array
        .iter()
        .any(|item| item["text"] == new_item["text"] && item["type"] == new_item["type"])
    {
        array.push(new_item);
    }

    array
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::Value;

    #[test]
    fn test_add_unique_adds_new_item() {
        let array = vec![];
        let result = add_unique(array, "Hello World");

        assert_eq!(result.len(), 1);
        assert_eq!(
            result[0].get("text").and_then(Value::as_str),
            Some("Hello World")
        );
        assert_eq!(result[0].get("type").and_then(Value::as_str), Some("text"));
        assert_eq!(result[0].get("url"), Some(&Value::Null));
    }

    #[test]
    fn test_add_unique_does_not_add_duplicate() {
        let mut array = vec![];
        array = add_unique(array, "Hello World");
        let result = add_unique(array.clone(), "Hello World");

        assert_eq!(result.len(), 1);
    }

    #[test]
    fn test_add_unique_preserves_case() {
        let array = vec![];
        let result = add_unique(array, "  HeLLo WoRLd  ");

        assert_eq!(
            result[0].get("text").and_then(Value::as_str),
            Some("HeLLo WoRLd")
        );
    }

    #[test]
    fn test_add_unique_different_texts() {
        let mut array = vec![];
        array = add_unique(array, "First");
        let result = add_unique(array, "Second");

        assert_eq!(result.len(), 2);
        assert_eq!(result[0].get("text").and_then(Value::as_str), Some("First"));
        assert_eq!(
            result[1].get("text").and_then(Value::as_str),
            Some("Second")
        );
    }
}
