import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { AdminProvider } from "./context/admin.context";
import App from "./App";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user.context";
import { CampeonatoProvider } from "./context/campeonato.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>
      <AdminProvider>
        <CampeonatoProvider>
          <App />
        </CampeonatoProvider>
      </AdminProvider>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
