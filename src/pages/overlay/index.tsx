import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { bindTwitchAuth } from '../../utils/twitch-api';

import './index.css';

bindTwitchAuth();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
