export const timeOptions = {
  label:"Expiration Time",
  key:"expirationTime",
  items:[
    { label: "1 hour", value: 1 },
    { label: "6 hours", value: 6 },
    { label: "12 hours", value: 12 },
    { label: "24 hours", value: 24 },
    { label: "48 hours", value: 48 },
  ],
  defaultValue: 3,
};

export const limitItemsOptions = {
  label:"Limit of items",
  key:"limitItems",
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
  key:"keyboardShortcuts",
  items: [
    { label: "ctrl+v", value: "ctrl+v" },
    { label: "super+v", value: "super+v" },
    { label: "personalized", value: "personalized" },
  ],
  defaultValue: 0
};

export const DEFAULT_SYSTEM_SETTINGS = {
  expirationTime: timeOptions.items[timeOptions.defaultValue].value,
  limitItems: limitItemsOptions.items[limitItemsOptions.defaultValue].value,
  keyboardShortcuts: keyboardLaunchOptions.items[keyboardLaunchOptions.defaultValue].value,
  language: languagesOptions.items[languagesOptions.defaultValue].value,
};
