const htmlTemplate = ( pageTitle, reactDom ) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta property="description" content="Zippypoll is a quick and fun way to create a poll that can be shared with anyone." />
          <meta property="og:title" content="Zippypoll" />
          <meta property="og:description" content="Zippypoll is a quick and fun way to create a poll that can be shared with anyone." />
          <meta property="og:image" content="https://www.zippypoll.com/assets/images/zippypoll-logo.png" />
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-297005-4"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-297005-4');
          </script>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${ pageTitle }</title>
            <link rel="stylesheet" href="/assets/css/zippypoll.css"/>
            <link rel="shortcut icon" href="/assets/images/favicon.ico" type="image/x-icon">
            <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon">
        </head>

        <body>
            <div id="app">${ reactDom }</div>
            <script src="/assets/scripts/zippypoll.bundle.js"></script>
        </body>
        </html>
    `;
};


export { htmlTemplate };
