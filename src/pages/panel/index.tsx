import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { bindTwitchAuth } from "../../hooks/useTwitchAuth";

import App from "./App";

import "./index.scss";
import "./globals.css";

bindTwitchAuth();

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
