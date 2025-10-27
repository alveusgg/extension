import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { bindTwitchAuth } from "../../hooks/useTwitchAuth";

import { SettingsProvider } from "../overlay/hooks/useSettings";
import App from "./App";

import "./globals.css";

bindTwitchAuth();

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </StrictMode>,
);
