import express from "express";
import path from "path";
import React from "react";
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Redux from '../js/redux/';
import ReduxThunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Layout from "../js/components/layout";
import { htmlTemplate } from "./template";
import * as db from './queries';
const app = express()

app.use('/assets/scripts', express.static('./src/dist/scripts'));
app.use('/assets/css', express.static('./src/dist/css'));


const loadHomePage = (req,res)=> {
    const store = createStore( Redux.reducer, applyMiddleware( ReduxPromise, ReduxThunk ) );
    const context = { };
    const jsx = (
      <Provider store={ store }>
        <StaticRouter context={ context } location={ req.url }>
            <Layout />
        </StaticRouter>
    </Provider>
    );
    const title = "Zippy Poll";
    const reactDom = renderToString( jsx );

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( title, reactDom ) );
}

app.use(express.json());
app.post('/api/createPoll', db.createPoll );
app.get('/*', loadHomePage );

app.listen(8081, function () {
  console.log('app listening on port 8081!')
});
