import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";

import App from "./containers/App";
import Login from "./containers/Login";
import About from "./containers/About";
import Movie from "./containers/Movie";
import Search from "./containers/Search";

import { restoreAuth } from "./actions";
import requireAuth from "./hoc/requireAuth";
import { extractSession } from "./utils/session";

import configureStore from "./store";
import history from "./history";

import "normalize.css";
import "./assets/main.css";

const store = configureStore({}, history);

const routes = (
  <Switch>
    <Route path="/login" exact component={Login} />
    <Route path="/movies/:id" component={requireAuth(Movie)} />
    <Route path="/movies" component={requireAuth(Search)} />
    <Route path="/about" component={About} />
  </Switch>
);

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>{routes}</ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );
};

const startApp = () => {
  const session = extractSession();

  if (session) {
    store.dispatch(restoreAuth(session)).then(() => renderApp());
  } else {
    renderApp();
  }
};

startApp();
