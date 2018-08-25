import styles from './zippypoll';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Redux from './redux/';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';

import Layout from "./components/layout";

let store = null;

if( process.env.NODE_ENV === 'development' ) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore(
    Redux.reducer,
    composeEnhancers(applyMiddleware(require('redux-freeze'), ReduxPromise, ReduxThunk))
  );
} else {
  store = createStore( Redux.reducer, applyMiddleware( ReduxPromise, ReduxThunk ) );
}

const jsx = ( <Provider store={ store }><Router><Layout /></Router></Provider> );

const app = document.getElementById( "app" );
ReactDOM.hydrate( jsx, app );
