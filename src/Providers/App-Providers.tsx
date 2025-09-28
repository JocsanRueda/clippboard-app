import { PageProvider } from "@/context/Page-Contex";
import { SystemSettingsProvider } from "@/context/System-Settings-Context";
import { ThemeProvider } from "@/context/Theme-Context";
import React from "react";

export function AppProviders({children}: {children:React.ReactNode}) {

  return (
    <PageProvider>
      <ThemeProvider>
        <SystemSettingsProvider>
          {children}
        </SystemSettingsProvider>
      </ThemeProvider>
    </PageProvider>
  );
}
