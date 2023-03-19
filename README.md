# MockTTP Service Worker
A small project using Mockttp to intercept requests made to example.com, and injecting a functioning Service Worker. Based on the following example:
https://github.com/httptoolkit/mockttp-proxy-demo

## How to use this

### requirements
* NodeJS
* Chromium (version in use at time of development 98.0.4739.0)

### steps to demo the project
* Clone the repo.
* Run `npm install` inside the repo.
* Run `npm start chrome` to start the proxy and an intercepted Chrome window.