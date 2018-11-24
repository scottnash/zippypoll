const htmlTemplate = ( pageTitle, reactDom ) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta property="og:title" content="Zippypoll" />
          <meta property="og:description" content="Zippypoll is designed to be a quick and fun way to create an informal poll—on any subject—that can be shared with anyone." />
          <meta property="og:image" content="https://www.zippypoll.com/assets/images/zippypoll-logo.png" />
          <!-- Global site tag (gtag.js) - Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-297005-4"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-297005-4');
          </script>
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({
                    google_ad_client: "ca-pub-9409841340300667",
                    enable_page_level_ads: true
               });
          </script>

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
