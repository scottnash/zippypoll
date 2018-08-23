import styles from './zippypoll';
import LogoStyles from './components/logo/ZippyLogo';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout";

const jsx = ( <Router><Layout /></Router> );

const app = document.getElementById( "app" );
ReactDOM.hydrate( jsx, app );
