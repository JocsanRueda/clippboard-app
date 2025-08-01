import { readText } from '@tauri-apps/plugin-clipboard-manager';
import { useEffect, useRef } from "react";


// This hook watches the clipboard for changes and calls the provided callback
// function whenever the clipboard text changes. It checks for changes at a specified interval.
// The `onChange` function receives the new clipboard text as an argument.
// The `interval` parameter specifies how often to check the clipboard (default is 1000 ms).
// It is useful for applications that need to monitor clipboard changes in real-time.
// Usage: Call this hook in a component and provide a function to handle clipboard changes.
export function useClipboardWatcher(onChange: (newText: string) => void, interval = 1000) {
  const lastText = useRef("");

  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const currentText = await readText();
        if (currentText !== lastText.current) {
          lastText.current = currentText;
          onChange(currentText);
        }
      } catch (err) {
        console.error("Error reading clipboard:", err);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onChange, interval]);
}
