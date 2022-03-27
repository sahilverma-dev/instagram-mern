import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { AuthProvider } from "./context/authContext";
import "./index.css";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
