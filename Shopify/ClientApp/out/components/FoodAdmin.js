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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var AuthorizeService_1 = require("./api-authorization/AuthorizeService");
function ingredientsAsString(ingredients) {
    var string = "";
    ingredients.forEach(function (element) {
        string += element.ingredient.name + "(" + element.amount + " " + element.ingredient.unitOfMeassure.name + "), ";
    });
    return string;
}
var FoodAdmin = /** @class */ (function (_super) {
    __extends(FoodAdmin, _super);
    function FoodAdmin(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { unitsOfMeassureloading: true, unitsOfMeassure: [],
            ingredientsLoading: true, ingredinets: [],
            dishesLoading: true, dishes: [] };
        return _this;
    }
    FoodAdmin.prototype.componentDidMount = function () {
        this.populateData();
    };
    FoodAdmin.renderUnitsOfMeassureTable = function (data) {
        return (React.createElement("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Id"),
                    React.createElement("th", null, "Name"))),
            React.createElement("tbody", null, data.map(function (unitOfMeassure) {
                return React.createElement("tr", { key: unitOfMeassure.id },
                    React.createElement("td", null, unitOfMeassure.id),
                    React.createElement("td", null, unitOfMeassure.name));
            }))));
    };
    FoodAdmin.renderIngredientsTable = function (data) {
        return (React.createElement("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Id"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Unit"))),
            React.createElement("tbody", null, data.map(function (ingredient) {
                return React.createElement("tr", { key: ingredient.id },
                    React.createElement("td", null, ingredient.id),
                    React.createElement("td", null, ingredient.name),
                    React.createElement("td", null, ingredient.unitOfMeassure.name));
            }))));
    };
    FoodAdmin.renderDishesTable = function (data) {
        return (React.createElement("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Id"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Ingredients"))),
            React.createElement("tbody", null, data.map(function (dish) {
                return React.createElement("tr", { key: dish.id },
                    React.createElement("td", null, dish.id),
                    React.createElement("td", null, dish.name),
                    React.createElement("td", null, ingredientsAsString(dish.ingredients)));
            }))));
    };
    FoodAdmin.prototype.render = function () {
        var unitOfMeassureContents = this.state.unitsOfMeassureloading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : FoodAdmin.renderUnitsOfMeassureTable(this.state.unitsOfMeassure);
        var ingredientsContents = this.state.ingredientsLoading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : FoodAdmin.renderIngredientsTable(this.state.ingredinets);
        var dishesContents = this.state.dishesLoading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : FoodAdmin.renderDishesTable(this.state.dishes);
        return (React.createElement("div", null,
            React.createElement("h1", { id: "tabelLabel" }, "Food administration"),
            React.createElement("h2", null, "Units of meassure"),
            unitOfMeassureContents,
            React.createElement("h2", null, "Ingredients"),
            ingredientsContents,
            React.createElement("h2", null, "Dishes"),
            dishesContents));
    };
    FoodAdmin.prototype.populateData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuthorizeService_1.default.getAccessToken()];
                    case 1:
                        token = _a.sent();
                        return [4 /*yield*/, fetch('api/UnitOfMeassures', {
                                headers: !token ? {} : { 'Authorization': "Bearer " + token }
                            })
                                .then(function (response) { return response.json(); })
                                .then(function (data) {
                                _this.setState({ unitsOfMeassure: data, unitsOfMeassureloading: false });
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fetch('api/Ingredients', {
                                headers: !token ? {} : { 'Authorization': "Bearer " + token }
                            })
                                .then(function (response) { return response.json(); })
                                .then(function (data) {
                                _this.setState({ ingredinets: data, ingredientsLoading: false });
                            })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, fetch('api/Dishes', {
                                headers: !token ? {} : { 'Authorization': "Bearer " + token }
                            })
                                .then(function (response) { return response.json(); })
                                .then(function (data) {
                                _this.setState({ dishes: data, dishesLoading: false });
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FoodAdmin;
}(react_1.Component));
exports.FoodAdmin = FoodAdmin;
//# sourceMappingURL=C:/Users/krzyc/source/repos/Shopify/Shopify/ClientApp/out/components/FoodAdmin.js.map