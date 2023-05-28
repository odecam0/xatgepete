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
exports.SignInForm = void 0;
var react_1 = __importStar(require("react"));
var meteor_1 = require("meteor/meteor");
var SignInForm = function (props) {
    var _a = (0, react_1.useState)(''), username = _a[0], setUsername = _a[1];
    var _b = (0, react_1.useState)(''), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(''), passwordRepeat = _c[0], setPasswordRepeat = _c[1];
    var _d = (0, react_1.useState)(false), isSigningUp = _d[0], setIsSigningUp = _d[1];
    var _e = (0, react_1.useState)(''), errorMessage = _e[0], setErrorMessage = _e[1];
    var handleSignUp = function (e) {
        e.preventDefault();
        if (password == passwordRepeat) {
            meteor_1.Meteor.call('registerAccount', username, password);
            meteor_1.Meteor.loginWithPassword(username, password);
        }
        else {
            setErrorMessage("As duas senhas precisam ser idênticas.");
            setPassword('');
            setPasswordRepeat('');
        }
    };
    var handleSignIn = function (e) {
        e.preventDefault();
        meteor_1.Meteor.loginWithPassword(username, password, function (e) {
            setErrorMessage('Houve um erro ao tentar conectar com este usuário e senha.');
            setUsername('');
            setPassword('');
        });
    };
    var text_input_style = "bg-inherit border-b-2 border-black";
    return (react_1["default"].createElement("div", { className: "grid place-items-center w-full h-full" },
        react_1["default"].createElement("div", { className: "border-solid border-black border-2 h-min p-8 rounded-xl flex flex-col gap-2" },
            react_1["default"].createElement("form", { method: "post", onSubmit: isSigningUp ? handleSignUp : handleSignIn },
                react_1["default"].createElement("div", { className: "flex flex-col gap-8" },
                    react_1["default"].createElement("div", { className: "flex flex-col gap-6" },
                        react_1["default"].createElement("label", null,
                            " Nome de usu\u00E1rio:",
                            react_1["default"].createElement("input", { className: text_input_style, name: "username", value: username, onChange: function (e) { return (setUsername(e.target.value)); } })),
                        react_1["default"].createElement("label", null,
                            " Senha:",
                            react_1["default"].createElement("input", { className: text_input_style, type: "password", name: "password", value: password, onChange: function (e) { return (setPassword(e.target.value)); } })),
                        isSigningUp ?
                            react_1["default"].createElement("label", null,
                                " Repita a senha:",
                                react_1["default"].createElement("input", { className: text_input_style, type: "password", name: "password-repeat", value: passwordRepeat, onChange: function (e) { return (setPasswordRepeat(e.target.value)); } })) : ""),
                    react_1["default"].createElement("button", { className: "border-solid border-black border-2 self-center py-1 px-4 rounded-lg", type: "submit" }, isSigningUp ? "Registrar-se" : "Conectar-se"))),
            (errorMessage != '') ?
                react_1["default"].createElement("div", { className: "text-red-700" }, errorMessage) : "",
            react_1["default"].createElement("button", { className: "self-center text-blue-700 border-b-2 border-blue-700", onClick: isSigningUp ? function () { return setIsSigningUp(false); } : function () { return setIsSigningUp(true); }, type: "button" }, isSigningUp ? "Conectar-se" : "Registrar-se"))));
};
exports.SignInForm = SignInForm;
