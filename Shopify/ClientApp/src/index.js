"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("bootstrap/dist/css/bootstrap.css");
var React = require("react");
var ReactDOM = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./App");
//import registerServiceWorker from './registerServiceWorker';
var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
var rootElement = document.getElementById('root');
ReactDOM.render(React.createElement(react_router_dom_1.BrowserRouter, { basename: baseUrl },
    React.createElement(App_1.default, null)), rootElement);
// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();
//# sourceMappingURL=index.js.map