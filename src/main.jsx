import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css";
import "./assets/normalize.css";

import { GlobalStateProvider } from "./assets/context/GlobalStateContext"; // Import the context provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </StrictMode>
);
