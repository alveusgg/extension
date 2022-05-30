import React from 'react';
import ReactDOM from 'react-dom/client';
import Config from './components/Config';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <Config/>
  </React.StrictMode>
);