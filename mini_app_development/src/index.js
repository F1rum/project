import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/global.css"; // Подключаем глобальные стили

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
