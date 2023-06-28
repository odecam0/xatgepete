"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Options = void 0;
var react_1 = __importDefault(require("react"));
var meteor_1 = require("meteor/meteor");
var Options = function (props) {
    var buttons_style = "bg-white rounded-xl py-1 px-3 border-black border-2";
    return (react_1["default"].createElement("div", { className: "flex flex-col gap-2" },
        react_1["default"].createElement("button", { className: buttons_style, type: "button" }, "Op\u00E7\u00F5es"),
        react_1["default"].createElement("button", { className: buttons_style, type: "button", onClick: function () { return meteor_1.Meteor.logout(); } }, "Desconectar-se")));
};
exports.Options = Options;
