import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initStore, } from "@/hooks/useInitStore";
import { ItemClipboard } from "@/types/item-clipboard.type";
import { ItemActionMenu } from "@/types/item-action-menu.type";

type ClipboardCtx = {
  dataList: ItemClipboard[];
  setDataList: React.Dispatch<React.SetStateAction<ItemClipboard[]>>;
  toggleActions: ItemActionMenu[];
  setToggleActions: React.Dispatch<React.SetStateAction<ItemActionMenu[]>>;
};

const ClipboardContext = createContext<ClipboardCtx | undefined>(undefined);

export const ClipboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataList, setDataList] = useState<ItemClipboard[]>([]);
  const [toggleActions, setToggleActions] = useState<ItemActionMenu[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { dataList: initialData, toggleActions: initialToggles } = await initStore();
        if (!mounted) return;
        setDataList(initialData ?? []);
        setToggleActions(initialToggles ?? []);
      } catch (e) {
        console.error("initStore failed", e);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({ dataList, setDataList, toggleActions, setToggleActions }),
    [dataList, toggleActions]
  );

  return <ClipboardContext.Provider value={value}>{children}</ClipboardContext.Provider>;
};

export const useClipboardContext = () => {
  const ctx = useContext(ClipboardContext);
  if (!ctx) throw new Error("useClipboardContext must be used inside ClipboardProvider");
  return ctx;
};
