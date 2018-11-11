import styles from './zippypoll';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./layout";

const jsx = ( <Router><Layout /></Router> );

const app = document.getElementById( "app" );
ReactDOM.hydrate( jsx, app );
