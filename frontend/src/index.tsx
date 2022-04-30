import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { initSentry } from "lib/error-lib";
import UserContextProvider from "lib/user-context";
import { connectAmplify } from "utils/connect-amplify";
import ErrorBoundary from "components/error-boundary";
import App from "app";
import "styles/app.css";

initSentry();
connectAmplify();

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);
