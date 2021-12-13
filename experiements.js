// const test = () => {
//     return server.get(HOST + "/sw.js").thenFromFile(200, "./sw.js")
// }



// server.addRules({
//     matchers: HOST,
//     handler: (request) => {
//         return test;
//     }
// });
// server.addRequestRules({
//     matchers: HOST,
//     handler: test
// })





// const serverUpdate = await server.anyRequest().forHost(HOST).thenPassThrough({

    // beforeRequest: (request) => {


    //     if (request.path === '/sw.jsssss') {
    //         return {
    //             headers: { 'content-type': 'text/html' },
    //             body: response.body.text.replace('</head>', serviceWorkerInclude + '</head>')
    //             // body: response.body.text.replace(/<h1.*?<\/h1>/g, '<h1>Pwned!</h1>')
    //             // body: response.body.text.replace('test', 'Pwned!')
    //         };
    //     }

    //     return request
    // },
// });/





// server.anyRequest().forHost("google.com").thenCallback((request, response) => {})

    // await server.anyRequest().forHost()
    // .forGet("/sw.js").thenForwardTo("http://localhost:9832/sw.js");

    // await server.anyRequest().forHost("localhost").thenPassThrough({
    //     beforeResponse: (response) => {
    //         // Here you can access the real response:
    //         console.log(`Got ${response.statusCode} response with body: ${response}`);

    //         return {
    //             headers: { 'content-type': 'text/html' },
    //             body: response.body.text
    //         };
    //     }
    // });



    // server.anyRequest().forHost(HOST).thenCallback()


        // Inject 'Hello world' responses for all requests
    // await server.anyRequest().thenReply(200, "Hello world");










     // await server.get('https://' + HOST).thenPassThrough({

    //         beforeResponse: (response) => {

    //             console.log(response);

    //             return response;

    //             console.log('test');

    //             // Here you can access the real response:
    //             // console.log(`Got ${response.statusCode} response with body: ${response.body.text}`);
    
    //             // Values returned here replace parts of the response:
    //             if (response.headers['content-type']?.startsWith('text/html')) {
    //                 // E.g. append to all HTML response bodies:
    //                 return {
    //                     headers: { 'content-type': 'text/html' },
    //                     body: response.body.text
    //                     .replace('</head>', serviceWorkerInclude + '</head>')
    //                     .replace(/<h1.*?<\/h1>/g, '<h1>Pwned!</h1>')
    //                 };
    //             } else {
    //                 return response;
    //             }
    //         }
    //     });

    //     await server.get(/.*/).thenPassThrough();
    //     await server.anyRequest().thenPassThrough();



    // Or wrap targets, transforming real requests & responses:
    // const serverUpdate = await server.anyRequest().forHost(HOST).thenPassThrough({

    //     beforeResponse: (response) => {
    //         // Here you can access the real response:
    //         // console.log(`Got ${response.statusCode} response with body: ${response.body.text}`);

    //         // Values returned here replace parts of the response:
    //         if (response.headers['content-type']?.startsWith('text/html')) {
    //             // E.g. append to all HTML response bodies:
    //             return {
    //                 headers: { 'content-type': 'text/html' },
    //                 body: response.body.text
    //                 .replace('</head>', serviceWorkerInclude + '</head>')
    //                 .replace(/<h1.*?<\/h1>/g, '<h1>Pwned!</h1>')
    //             };
    //         } else {
    //             return {};
    //         }
    //     }
    // });