"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./components/Home");
var FoodAdmin_1 = require("./components/FoodAdmin");
var UnitsOfMeasure_1 = require("./components/UnitsOfMeasure");
var Ingredients_1 = require("./components/Ingredients");
//import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
var ApiAuthorizationRoutes_1 = require("./components/api-authorization/ApiAuthorizationRoutes");
var ApiAuthorizationConstants_1 = require("./components/api-authorization/ApiAuthorizationConstants");
require("typeface-roboto");
require("./custom.css");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(Layout_1.Layout, null,
            React.createElement(react_router_1.Route, { exact: true, path: '/', component: Home_1.Home }),
            React.createElement(react_router_1.Route, { path: '/food-admin', component: FoodAdmin_1.FoodAdmin }),
            React.createElement(react_router_1.Route, { path: '/units-of-measure', component: UnitsOfMeasure_1.UnitsOfMeasure }),
            React.createElement(react_router_1.Route, { path: '/ingredients', component: Ingredients_1.Ingredients }),
            React.createElement(react_router_1.Route, { path: ApiAuthorizationConstants_1.ApplicationPaths.ApiAuthorizationPrefix, component: ApiAuthorizationRoutes_1.default })));
    };
    App.displayName = App;
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=C:/Users/krzyc/source/repos/Shopify/Shopify/ClientApp/out/App.js.map