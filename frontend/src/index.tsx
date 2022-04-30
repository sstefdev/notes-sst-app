import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import UserContextProvider from "lib/user-context";
import { connectAmplify } from "utils/connect-amplify";
import App from "app";
import "styles/app.css";

connectAmplify();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
