
import { useEffect, useRef } from "react";
import { listen } from "@tauri-apps/api/event";
import { CLIPBOARD_EVENT } from "@/constants/constant";
import { newItemPayload } from "@/types/new-item-payload";

// This hook watches the clipboard for changes and calls the provided callback
// function whenever the clipboard text changes. It checks for changes at a specified interval.
// The `onChange` function receives the new clipboard text as an argument.
// The `interval` parameter specifies how often to check the clipboard (default is 1000 ms).
// It is useful for applications that need to monitor clipboard changes in real-time.
// Usage: Call this hook in a component and provide a function to handle clipboard changes.
// eslint-disable-next-line no-unused-vars
export function useClipboardWatcher(onChange: (newItem: newItemPayload) => void) {
  const lastText = useRef<newItemPayload | null>(null);

  useEffect(() => {
    const unlisten= listen<newItemPayload>(CLIPBOARD_EVENT.NEW_ITEM, (event) => {

      const payload= event.payload;
      lastText.current = payload;
      onChange(payload);
    });

    return () => {
      unlisten.then((f) => f());
    };
  }, [onChange]);

}
