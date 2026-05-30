import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/base.css";
import "./styles/colors.css";
import "./styles/layout.css";
import "./styles/typography.css";
import "./styles/global.css";
import App from "./App.tsx";
import { LightsProvider } from "./context/LightContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LightsProvider>
        <App />
      </LightsProvider>
    </BrowserRouter>
  </StrictMode>,
);
