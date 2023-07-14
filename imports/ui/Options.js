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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Options = void 0;
var react_1 = __importStar(require("react"));
var meteor_1 = require("meteor/meteor");
var react_modal_1 = __importDefault(require("react-modal"));
var gear_setting_settings_svgrepo_com_1 = require("../../icons/gear-setting-settings-svgrepo-com");
var log_out_svgrepo_com_1 = require("../../icons/log-out-svgrepo-com");
var mongo_1 = require("meteor/mongo");
var Keys = new mongo_1.Mongo.Collection('Keys');
var Options = function () {
    var buttons_style = "flex items-center py-1 gap-2 bg-white rounded-xl px-3 border-black border-2 text-sm ";
    var _a = (0, react_1.useState)(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "flex flex-col gap-2" },
            react_1["default"].createElement("button", { className: buttons_style, type: "button", onClick: function () { return setIsModalOpen(!isModalOpen); } },
                react_1["default"].createElement(gear_setting_settings_svgrepo_com_1.ReactComponent, { className: "h-6" }),
                "Op\u00E7\u00F5es"),
            react_1["default"].createElement("button", { className: buttons_style, type: "button", onClick: function () { return meteor_1.Meteor.logout(); } },
                react_1["default"].createElement(log_out_svgrepo_com_1.ReactComponent, { className: "h-6" }),
                "Desconectar-se")),
        react_1["default"].createElement(OptionsModal, { isOpen: isModalOpen, closeModal: function () { return setIsModalOpen(false); } })));
};
exports.Options = Options;
var OptionsModal = function (props) {
    var _a = (0, react_1.useState)(''), apiKey = _a[0], setApiKey = _a[1];
    var setInitialApiKeyValue = function () {
        meteor_1.Meteor.subscribe('key');
        setApiKey(Keys.find().fetch()[0].apiKey);
    };
    return (react_1["default"].createElement(react_modal_1["default"], { className: "absolute bg-white p-8 flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", isOpen: props.isOpen, onAfterClose: function () { return meteor_1.Meteor.call('setUserApiKey', apiKey); }, onAfterOpen: function () { return setInitialApiKeyValue(); }, shouldCloseOnOverlayClick: true },
        react_1["default"].createElement("div", { className: "flex flex-col gap-2" },
            react_1["default"].createElement("div", null, "Insira sua chave aqui:"),
            react_1["default"].createElement("form", { onSubmit: props.closeModal },
                react_1["default"].createElement("input", { className: 'grow px-2 border-solid border-b-2 border-black bg-white w-full', type: 'text', value: apiKey, onChange: function (e) { return setApiKey(e.target.value); } })),
            react_1["default"].createElement("button", { className: "bg-white rounded-lg p-2 border-black border-2 self-center w-fit", onClick: props.closeModal }, "Close"))));
};
