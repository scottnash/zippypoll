import express from "express";
import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Layout from "../js/components/layout";
import { htmlTemplate } from "./template";
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

app.get('/*', loadHomePage );

app.listen(8081, function () {
  console.log('app listening on port 8081!')
});