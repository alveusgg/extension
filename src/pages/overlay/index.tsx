import React from 'react';
import ReactDOM from 'react-dom/client';

import {registerTwitchAuthCallback} from '../../utils/channels'
import App from './App'

import './index.css';

registerTwitchAuthCallback()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
