(async () => {
    const mockttp = require('mockttp');
    const path = require('path');
    var globToRegExp = require('glob-to-regexp');
    var include = require('./includes.js');

    // Create a proxy server with a self-signed HTTPS CA certificate:
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https });

    const HTTP = 'https://'
    const ORIGIN = 'example.com'
    const HOST = HTTP + ORIGIN;

    const beforeResponse = {

        beforeResponse: (response) => {

            // Here you can access the real response:
            // console.log(`Got ${response.statusCode} response with body: ${response.body.text}`);

            // Values returned here replace parts of the response:
            if (response.headers['content-type']?.startsWith('text/html')) {
                // E.g. append to all HTML response bodies:
                return {
                    headers: { 'content-type': 'text/html' },
                    body: response.body.text
                    .replace('</head>', include.icons + include.manifest + include.serviceWorker + '</head>')
                    .replace(/<h1.*?<\/h1>/g, '<h1>The page is being intercepted!</h1>')
                };
            } else {
                return response;
            }
        }
    }

    await server.anyRequest().thenPassThrough()
    await server.get(HOST).thenPassThrough(beforeResponse); 
    await server.get(globToRegExp(`${HOST}/*`)).thenPassThrough(beforeResponse);
    await server.get(HOST + "/manifest.json").thenFromFile(200, "./src/manifest.json");
    await server.get(HOST + "/offline.html").thenFromFile(200, "./src/offline.html");
    await server.get(HOST + "/sw.js").thenFromFile(200, "./src/sw.js", {
        'Content-Type': 'application/javascript'
    });

    // Alernative Example:
    // - Pass request straight through to localhost (test a project under https)
    // - Note: works with SPA (Single Page Application), untested with MPA (Mutliple Page Application).
    // - Maybe regex can be used in the .thenForwardTo function
    // await server.get(globToRegExp(`${HOST}/*`)).thenForwardTo('http://localhost:3000')

    // icons rewrites
    await server.get(HOST + "/app_icons/manifest-icon-192.png").thenFromFile(200, "./src/app_icons/manifest-icon-192.png");
    await server.get(HOST + "/app_icons/manifest-icon-512.png").thenFromFile(200, "./src/app_icons/manifest-icon-512.png");
    await server.get(HOST + "/app_icons/manifest-icon-192.png").thenFromFile(200, "./src/app_icons/manifest-icon-192.png");
    await server.get(HOST + "/app_icons/manifest-icon-512.png").thenFromFile(200, "./src/app_icons/manifest-icon-512.png");

    // TODO setup regex matching (not sure if this is possible)
    // await server.get(globToRegExp(`${HOST}/app_icons/*`)).thenFromFile(200, globToRegExp(`./app_icons/*`));

    await server.start();


    const caFingerprint = mockttp.generateSPKIFingerprint(https.cert);

    // run npm run chrome, to start the server AND launch chrome
    if (process.argv[2] === 'chrome') {
        const launchChrome = require('./launch-chrome');
        launchChrome(HOST, server, caFingerprint);
    } else {
        // Print out the server details for manual configuration:
        console.log(`Server running on port ${server.port}`);
        console.log(`CA cert fingerprint ${caFingerprint}`);
    }
})(); // (All run in an async wrapper, so we can easily use top-level await)