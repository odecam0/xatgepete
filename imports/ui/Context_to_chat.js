"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Context_to_chat = void 0;
var meteor_1 = require("meteor/meteor");
var react_1 = __importDefault(require("react"));
var Context_to_chat = function (props) {
    var buttons_style = "text-lg md:text-sm bg-white rounded-xl py-1 px-3 border-black border-2 border-dashed";
    var buttons_style_selected = "bg-white rounded-xl py-1 px-3 border-black border-2 border-solyd";
    var handleClickNovoChat = function () {
        meteor_1.Meteor.call('createNewContext');
    };
    return (react_1["default"].createElement("div", { className: "flex flex-col grow gap-2 px-3 h-1/2 overflow-y-auto" },
        react_1["default"].createElement("button", { className: "bg-white rounded-xl py-1 px-3 border-black border-b-2 border-solid", type: 'button', onClick: handleClickNovoChat }, "Criar novo chat"),
        props.context_list.map(function (p, i) { return (react_1["default"].createElement("button", { className: (i == props.context_index) ?
                buttons_style_selected : buttons_style, key: i, type: 'button', onClick: function () { return props.onClick(i); } }, p.title)); })));
};
exports.Context_to_chat = Context_to_chat;
