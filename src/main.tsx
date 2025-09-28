import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProviders } from "./Providers/App-Providers";

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
);
