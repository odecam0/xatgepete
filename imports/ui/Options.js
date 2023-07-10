"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Options = void 0;
var react_1 = __importDefault(require("react"));
var meteor_1 = require("meteor/meteor");
var gear_setting_settings_svgrepo_com_1 = require("../../icons/gear-setting-settings-svgrepo-com");
var log_out_svgrepo_com_1 = require("../../icons/log-out-svgrepo-com");
var Options = function () {
    var buttons_style = "flex items-center py-1 gap-2 bg-white rounded-xl px-3 border-black border-2 text-sm ";
    return (react_1["default"].createElement("div", { className: "flex flex-col gap-2" },
        react_1["default"].createElement("button", { className: buttons_style, type: "button" },
            react_1["default"].createElement(gear_setting_settings_svgrepo_com_1.ReactComponent, { className: "h-6" }),
            "Op\u00E7\u00F5es"),
        react_1["default"].createElement("button", { className: buttons_style, type: "button", onClick: function () { return meteor_1.Meteor.logout(); } },
            react_1["default"].createElement(log_out_svgrepo_com_1.ReactComponent, { className: "h-6" }),
            "Desconectar-se")));
};
exports.Options = Options;
