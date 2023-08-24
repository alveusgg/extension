import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { SettingsProvider } from "./hooks/useSettings";
import { SleepingProvider } from "./hooks/useSleeping";
import { bindTwitchAuth } from "../../utils/twitch-api";

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
