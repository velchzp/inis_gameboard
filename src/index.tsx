import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useParams } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter basename="/game">
      <App />
    </BrowserRouter>
  </Provider>
);
