import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Layout from "../js/layout";
import { htmlTemplate } from "./template";
import * as db from './queries';
const app = express()

app.use('/assets/scripts', express.static('./src/dist/scripts'));
app.use('/assets/css', express.static('./src/dist/css'));


const loadHomePage = (req,res)=> {
    const context = { };
    const jsx = (
        <StaticRouter context={ context } location={ req.url }>
            <Layout />
        </StaticRouter>
    );
    const title = "Zippy Poll";
    const reactDom = renderToString( jsx );

    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( htmlTemplate( title, reactDom ) );
}

app.use(express.json());
app.post( '/api/createPoll', db.createPoll );
app.post( '/api/getPoll', db.getPoll );
app.post( '/api/joinPoll', db.joinPoll );
app.post( '/api/addOption', db.addOption );
app.post( '/api/getOptions', db.getOptions );
app.post( '/api/adjustOptionVote', db.adjustOptionVote );

app.get('/*', loadHomePage );

app.listen(8081, function () {
  console.log('app listening on port 8081!')
});
