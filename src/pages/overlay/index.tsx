import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { bindTwitchAuth } from "../../hooks/useTwitchAuth";

import App from "./App";
import { SettingsProvider } from "./hooks/useSettings";
import { SleepingProvider } from "./hooks/useSleeping";

import "./index.scss";

bindTwitchAuth();

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <SettingsProvider>
      <SleepingProvider>
        <App />
      </SleepingProvider>
    </SettingsProvider>
  </StrictMode>,
);
