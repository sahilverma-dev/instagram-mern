import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import "./index.css";

ReactDOM.render(
  <ThemeProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
