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