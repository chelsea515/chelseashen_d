import React from "react";
import { createRoot } from "react-dom/client";
import "./globals.css";
import Home from "./page";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
);
