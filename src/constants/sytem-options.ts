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
  key:"item_limit",
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
    { label: "english", value: "en" },
    { label: "spanish", value: "es" },
  ],
  defaultValue: 0,
};

export const keyboardLaunchOptions = {
  label:"Keyboard launch",
  key:"keyboard_shortcut",
  items: [
    { label: "Ctrl+H", value: "Ctrl+H" },
  ],
  defaultValue: 0
};

export const orderItemsOptions = {
  label:"Order Items ",
  key:"item_order",
  items: [
    { label: "ascending", value: "ascending" },
    { label: "descending", value: "descending" },
  ],
  defaultValue: 0
};

export const roundedWindowOptions = {
  label:"Rounded Window",
  key:"rounded_window_corners",
  items: [
    { label: "enabled", value: true },
    { label: "disabled", value: false },
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
  item_limit: limitItemsOptions.items[limitItemsOptions.defaultValue].value,
  keyboard_shortcut: keyboardLaunchOptions.items[keyboardLaunchOptions.defaultValue].value,
  language: languagesOptions.items[languagesOptions.defaultValue].value,
  item_order: orderItemsOptions.items[orderItemsOptions.defaultValue].value,
  rounded_window_corners: roundedWindowOptions.items[roundedWindowOptions.defaultValue].value,
  font_size: fontSizeOptions.items[fontSizeOptions.defaultValue].value,
  horizontal_size: 380,
  vertical_size:440
};
