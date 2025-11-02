import { keyboardLaunchOptions } from "@/constants/sytem-options";
import { useEffect, useRef, useState } from "react";
type Props = {
  value?: string | null;
  placeholder?: string;
  // eslint-disable-next-line no-unused-vars
  setEditing?: (state: boolean) => void;

  // eslint-disable-next-line no-unused-vars
  onChange: (combo: string | null) => void;
};

// Constantes únicas (solo existen una vez)
const KEY_MAP: Record<string, string> = {
  " ": "Space",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Escape: "Esc",
  Enter: "Enter",
  Tab: "Tab",
  Backspace: "Backspace",
  Delete: "Delete",
  Home: "Home",
  End: "End",
  PageUp: "PageUp",
  PageDown: "PageDown",
};

const MODIFIER_KEYS = ["Control", "Alt", "Shift", "Meta"];
const MODIFIER_ALIASES=["Ctrl","Alt","Shift","Meta"];
const MODIFIER_ORDER: Record<string, number> = {
  Ctrl: 0, Alt: 1, Shift: 2, Meta: 3,
};

// Funciones inline ultra rápidas
const normalizeKey = (key: string): string =>
  KEY_MAP[key] || (key.length === 1 ? key.toUpperCase() : key);

// eslint-disable-next-line no-undef
const modifiersFromEvent = (e: KeyboardEvent): string[] => {
  let i = 0;
  const mods: string[] = [];
  if (e.ctrlKey) mods[i++] = MODIFIER_ALIASES[0];
  if (e.altKey) mods[i++] = MODIFIER_ALIASES[1];
  if (e.shiftKey) mods[i++] = MODIFIER_ALIASES[2];
  if (e.metaKey) mods[i++] = MODIFIER_ALIASES[3];
  if (i > 1) mods.sort((a, b) => MODIFIER_ORDER[a] - MODIFIER_ORDER[b]);
  return mods;
};

export default function ShortcutInput({ value, placeholder, onChange, setEditing }: Props) {
  const [display, setDisplay] = useState(value ?? "");
  const listening = useRef(false);
  const lastValue = useRef(value ?? "");

  // Solo se sincroniza si cambia externamente
  useEffect(() => {
    if (value !== lastValue.current) {
      lastValue.current = value ?? "";
      setDisplay(lastValue.current);
    }
  }, [value]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const handler = (e: KeyboardEvent) => {
      if (!listening.current) return;

      e.preventDefault();
      e.stopPropagation();

      const key = e.key;

      console.log("Key pressed:", key);

      console.log("Modifier keys state:", e.key);

      if (MODIFIER_KEYS.includes(key)) {
        const mods = modifiersFromEvent(e);
        setDisplay(mods.join("+"));
        return;
      }

      if (key === "Escape") {
        listening.current = false;
        setDisplay(lastValue.current);
        return;
      }

      if (key === "Backspace") {
        listening.current = false;
        lastValue.current = "";
        setDisplay("");
        onChange(null);
        return;
      }

      const combo = (() => {
        const mods = modifiersFromEvent(e);
        const main = normalizeKey(key);

        return mods.length ? `${mods.join("+")}+${main}` : main;
      })();

      listening.current = false;
      lastValue.current = combo;
      setDisplay(combo);
      onChange(combo);
    };

    // Registrar solo una vez
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [onChange]);

  const start = () => {
    listening.current = true;
    setEditing?.(true);
    setDisplay("");
  };

  const stop = () => {
    listening.current = false;
    setEditing?.(false);

    if (!display.includes("+")) {

      const defaultValues= keyboardLaunchOptions.items[0].value.split("+");
      const mod= defaultValues[0];
      const key= defaultValues[1];

      if (!MODIFIER_ALIASES.some(mod=> display.includes(mod))) {

        const newDisplay= `${mod}+${display}`;
        setDisplay(newDisplay);
        onChange(newDisplay);

      }else{
        const newDisplay= `${display}+${key}`;
        setDisplay(newDisplay);
        onChange(newDisplay);

      }

    }

  };

  return (
    <input
      readOnly
      value={display}
      placeholder={placeholder ?? "Pulsar combinación..."}
      className="font-light text-black dark:text-white bg-gray-300 dark:bg-secondary-light border-solid border-width-selected  rounded-lg  px-0.5 py-2.5 text-center inline-flex items-center border-gray-400 dark:border-tertiary-dark"
      onFocus={start}
      onClick={start}
      onBlur={stop}
    />
  );
}
