"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Context_to_chat = void 0;
var meteor_1 = require("meteor/meteor");
var react_1 = __importDefault(require("react"));
var chat_svgrepo_com_1 = require("../../icons/chat-svgrepo-com");
var plus_frame_svgrepo_com_1 = require("../../icons/plus-frame-svgrepo-com");
var Context_to_chat = function (props) {
    var buttons_style = "h-9 flex gap-2 items-center text-sm bg-white rounded-xl px-3 border-black border-2 border-dashed";
    var buttons_style_selected = "text-sm h-9 flex gap-2 items-center bg-white rounded-xl px-3 border-black border-2 border-solid";
    var handleClickNovoChat = function () {
        meteor_1.Meteor.call('createNewContext');
    };
    return (react_1["default"].createElement("div", { className: "flex flex-col grow gap-2 px-3 h-1/2 overflow-y-auto" },
        react_1["default"].createElement("button", { className: "h-9 bg-white text-sm rounded-xl py-1 px-4 border-black border-b-2 border-solid flex items-center gap-2", type: 'button', onClick: handleClickNovoChat },
            react_1["default"].createElement(plus_frame_svgrepo_com_1.ReactComponent, { style: { height: "50%" } }),
            react_1["default"].createElement("div", null, "Criar novo chat")),
        props.context_list.map(function (p, i) { return (react_1["default"].createElement("button", { className: (i == props.context_index) ?
                buttons_style_selected : buttons_style, key: i, type: 'button', onClick: function () { return props.onClick(i); } },
            react_1["default"].createElement(chat_svgrepo_com_1.ReactComponent, { className: "h-1/2" }),
            p.title)); })));
};
exports.Context_to_chat = Context_to_chat;
