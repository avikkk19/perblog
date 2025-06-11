import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter future={{ v7_relativeSplatPath: true }}>
    <React.StrictMode>
      <App />
      <Analytics />
    </React.StrictMode>
  </BrowserRouter>
);
