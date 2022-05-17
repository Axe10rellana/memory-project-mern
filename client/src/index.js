//importaciones
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//estilos css
import "./styles/index.css";

//reducers
import { reducers } from "./reducers";

//variables
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const container = document.getElementById("root");
const root = createRoot(container);

//renderizado
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
