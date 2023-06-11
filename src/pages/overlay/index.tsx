import React from "react";
import ReactDOM from "react-dom/client";

import App from './App';
import { SettingsProvider } from './hooks/useSettings';
import { SleepingProvider } from './hooks/useSleeping';
import { bindTwitchAuth } from '../../utils/twitch-api';

import "./index.scss";

bindTwitchAuth();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <SettingsProvider>
      <SleepingProvider>
        <App />
      </SleepingProvider>
    </SettingsProvider>
  </React.StrictMode>
);
