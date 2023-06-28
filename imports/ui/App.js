"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.App = void 0;
var meteor_1 = require("meteor/meteor");
var react_meteor_data_1 = require("meteor/react-meteor-data");
var react_1 = __importDefault(require("react"));
var SignInAndUp_1 = require("./SignInAndUp");
var Chat_1 = require("./Chat");
var App = function () {
    var user = (0, react_meteor_data_1.useTracker)(function () { return meteor_1.Meteor.user(); }); // toda a aplicação.
    return (react_1["default"].createElement("div", { className: "flex h-screen" }, user ? // Aqui é implementada a lógica que define
        react_1["default"].createElement(Chat_1.Chat, null) : // oque será exibido caso haja ou não uma
        react_1["default"].createElement(SignInAndUp_1.SignInForm, null) // sessão de usuário.
    ));
};
exports.App = App;
