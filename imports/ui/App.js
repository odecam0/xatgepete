"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.App = void 0;
var react_1 = __importStar(require("react"));
var App = function () { return (react_1["default"].createElement("div", { className: "main_layout" },
    react_1["default"].createElement("div", { className: "left_part" },
        react_1["default"].createElement(Context_to_chat, null),
        react_1["default"].createElement(Options, null)),
    react_1["default"].createElement("div", { className: "right_part" },
        react_1["default"].createElement(Chat, null),
        react_1["default"].createElement(Prompt, null)))); };
exports.App = App;
var mock_other_conversations = [
    { title: "Primeira conversa" },
    { title: "Segunda conversa" },
    { title: "Decima quinta conversa?" }
];
var Context_to_chat = function (props) {
    var get_chats_buttons = function (buttoms_list) {
        return (buttoms_list.map(function (p, i) { return (react_1["default"].createElement("buttom", { className: "conversation_buttom", key: i, type: 'buttom' }, p.title)); }));
    };
    return (react_1["default"].createElement("div", { className: "context_of_chat" }, get_chats_buttons(mock_other_conversations)));
};
var Options = function (props) {
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("buttom", { type: "buttom" }, "Op\u00E7\u00F5es")));
};
var Chat = function (props) {
    return (react_1["default"].createElement("div", { className: "chat" },
        react_1["default"].createElement("h1", null, "\"O chat ainda tenho que ver como que vai fazer...\"")));
};
var Prompt = function (props) {
    var _a = (0, react_1.useState)(""), prompt_data = _a[0], set_prompt_data = _a[1];
    var handleChange = function (e) { set_prompt_data(e.target.value); };
    return (react_1["default"].createElement("div", { className: "prompt" },
        react_1["default"].createElement("form", null,
            react_1["default"].createElement("input", { type: 'text', value: prompt_data, onChange: handleChange }),
            react_1["default"].createElement("input", { className: 'submit', type: 'submit', value: 'Enviar' }))));
};
// (setq tab-width 2)
