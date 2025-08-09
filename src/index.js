import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import "pace-js/themes/blue/pace-theme-minimal.css"; // Import the desired theme
import pace from "pace-js";
import { LanguageProvider } from "./LanguageContext";
import { LoadingProvider } from "./LoadingContext";
import LoadingSpinner from "./LoadingSpinner";
import "./assets/styles/index.css";

// Configure Pace.js if necessary
window.paceOptions = {
  ajax: true, // Monitor AJAX requests
  document: true, // Monitor document loading
  eventLag: false, // Disable event lag monitoring
};

// Start Pace.js
pace.start();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <LoadingProvider>
            <App />
            <LoadingSpinner />
          </LoadingProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
