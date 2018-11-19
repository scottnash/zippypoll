const htmlTemplate = ( pageTitle, reactDom ) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${ pageTitle }</title>
            <link rel="stylesheet" href="/assets/css/zippypoll.css"/>
        </head>

        <body>
            <div id="app">${ reactDom }</div>
            <script src="/assets/scripts/zippypoll.bundle.js"></script>
        </body>
        </html>
    `;
};


export { htmlTemplate };
