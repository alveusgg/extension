import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

let root: ReactDOM.Root

// load component based on current view (viewer/config etc.)
const rootPanel = document.getElementById("root-panel") as HTMLElement
const rootConfig = document.getElementById("root-config") as HTMLElement

if(rootPanel) {
  root = ReactDOM.createRoot(
    rootPanel
  )
}else if(rootConfig) {
  root = ReactDOM.createRoot(
    rootConfig
  )
}else{
  root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
  console.error("No root element found")
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
