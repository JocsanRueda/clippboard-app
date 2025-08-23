pub fn normalize_string(input: &str) -> String {
    input.trim().to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_trim_whitespace() {
        let input = "   hello   ";
        let expected = "hello";
        assert_eq!(normalize_string(input), expected);
    }
}
