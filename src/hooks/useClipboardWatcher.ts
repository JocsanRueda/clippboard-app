
import { useEffect, useRef } from "react";
import { listen } from '@tauri-apps/api/event';


// This hook watches the clipboard for changes and calls the provided callback
// function whenever the clipboard text changes. It checks for changes at a specified interval.
// The `onChange` function receives the new clipboard text as an argument.
// The `interval` parameter specifies how often to check the clipboard (default is 1000 ms).
// It is useful for applications that need to monitor clipboard changes in real-time.
// Usage: Call this hook in a component and provide a function to handle clipboard changes.
export function useClipboardWatcher(onChange: (newText: string) => void) {
  const lastText = useRef("");

  useEffect(() => {
    const unlisten= listen<string>("clipboard-changed", (event) => {

    const newText= event.payload;
    lastText.current = newText;
    onChange(newText);
  })

    return () => {
      unlisten.then((f) => f());
    }
  }, [onChange]);


}
