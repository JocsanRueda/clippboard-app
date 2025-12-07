export const timeOptions = {
  label:"Expiration Time",
  key:"expiration_time",
  items:[
    { label: "1 hour", value: 60*60 },
    { label: "6 hours", value: 60*60*6 },
    { label: "12 hours", value: 60*60*12 },
    { label: "24 hours", value: 60*60*24 },
    { label: "48 hours", value: 60*60*48 },
  ],
  defaultValue: 3,
};

export const limitItemsOptions = {
  label:"Limit of items",
  key:"limit_items",
  items: [
    { label: "10 items", value: 10 },
    { label: "30 items", value: 30 },
    { label: "50 items", value: 50 },
    { label: "100 items", value: 100 },
    { label: "No limit", value: -1 },
  ],
  defaultValue: 3,
};

export const languagesOptions = {
  label:"Language",
  key:"language",
  items: [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
  ],
  defaultValue: 0,
};

export const keyboardLaunchOptions = {
  label:"Keyboard launch",
  key:"keyboard_shortcuts",
  items: [
    { label: "Ctrl+H", value: "Ctrl+H" },
  ],
  defaultValue: 0
};

export const orderItemsOptions = {
  label:"Order Items ",
  key:"order_items",
  items: [
    { label: "Ascending", value: "ascending" },
    { label: "Descending", value: "descending" },
  ],
  defaultValue: 0
};

export const roundedWindowOptions = {
  label:"Rounded Window",
  key:"rounded_window",
  items: [
    { label: "Enabled", value: true },
    { label: "Disabled", value: false },
  ],
  defaultValue: 0
};

export const fontSizeOptions = {
  label:"Font Size",
  key:"font_size",
  items: [
    { label: "Small", value: "12" },
  ],
  defaultValue: 0
};

export const DEFAULT_SYSTEM_SETTINGS = {
  expiration_time: timeOptions.items[timeOptions.defaultValue].value,
  limit_items: limitItemsOptions.items[limitItemsOptions.defaultValue].value,
  keyboard_shortcuts: keyboardLaunchOptions.items[keyboardLaunchOptions.defaultValue].value,
  language: languagesOptions.items[languagesOptions.defaultValue].value,
  order_items: orderItemsOptions.items[orderItemsOptions.defaultValue].value,
  rounded_window: roundedWindowOptions.items[roundedWindowOptions.defaultValue].value,
  font_size: fontSizeOptions.items[fontSizeOptions.defaultValue].value,
};
