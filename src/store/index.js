import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducers";

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__ || (() => noop => noop);

export default function configureStore(initialState = {}, history) {
  const middlewares = [thunk, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares), devtools()];
  const store = createStore(rootReducer, initialState, compose(...enhancers));
  return store;
}
