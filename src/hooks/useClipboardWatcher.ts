import { readText } from '@tauri-apps/plugin-clipboard-manager';
import { useEffect, useRef } from "react";

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
