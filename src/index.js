import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./i18n"; // Import your i18n configuration

import { Provider } from "react-redux";
import store from "./data/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
