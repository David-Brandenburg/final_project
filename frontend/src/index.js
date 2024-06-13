import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/index.scss";
import { ModalContextProvider } from "./contexts/ModalContext.js";
import { ScreenModeContextProvider } from "./contexts/ScreenModeContext.js";
import { LogginContextProvider } from "./contexts/LogginContext.js";
import { AddtoCardContextProvider } from "./contexts/AddtoCardContext.js";
import { LanguageProvider } from "./contexts/LanguageContext.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="855300264733-7elgo4lffpu6mqknp4oju0n60elpa6id.apps.googleusercontent.com">
    <LanguageProvider>
      <AddtoCardContextProvider>
        <LogginContextProvider>
          <ScreenModeContextProvider>
            <ModalContextProvider>
              <Router>
                <React.StrictMode>
                  <App />
                </React.StrictMode>
              </Router>
            </ModalContextProvider>
          </ScreenModeContextProvider>
        </LogginContextProvider>
      </AddtoCardContextProvider>
    </LanguageProvider>
  </GoogleOAuthProvider>
);
