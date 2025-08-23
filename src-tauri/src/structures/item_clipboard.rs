#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct ItemClipboard {
    pub text: String,
    pub item_type: String,
    pub url: String,
}
