import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { SettingsProvider } from './hooks/useStoredSettings';
import { bindTwitchAuth } from '../../utils/twitch-api';

import './index.scss';

bindTwitchAuth();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);
